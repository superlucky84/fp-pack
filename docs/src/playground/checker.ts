import ts from 'typescript';

export interface TypeReport {
  version: string;
  types: { name: string; type: string }[];
  diagnostics: {
    line: number;
    column: number;
    code: number;
    message: string;
  }[];
}

/** The browser worker and Node regressions share this virtual compiler host. */
export function createChecker(files: Record<string, string>) {
  const entry = '/playground.ts';
  const sources = new Map(Object.entries(files));
  const cache = new Map<string, ts.SourceFile>();
  const directories = new Set<string>(['/']);
  for (const filename of sources.keys()) {
    const parts = filename.split('/');
    for (let i = 1; i < parts.length; i++)
      directories.add(parts.slice(0, i).join('/') || '/');
  }
  const options: ts.CompilerOptions = {
    strict: true,
    exactOptionalPropertyTypes: true,
    noEmit: true,
    skipLibCheck: true,
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    lib: ['lib.es2022.d.ts', 'lib.dom.d.ts', 'lib.dom.iterable.d.ts'],
    types: [],
  };
  const host: ts.CompilerHost = {
    fileExists: filename => sources.has(filename),
    readFile: filename => sources.get(filename),
    directoryExists: directory => directories.has(directory),
    getDirectories: () => [],
    getSourceFile(filename, languageVersion) {
      const text = sources.get(filename);
      if (text === undefined) return undefined;
      const cached = cache.get(filename);
      if (cached) return cached;
      const source = ts.createSourceFile(filename, text, languageVersion, true);
      cache.set(filename, source);
      return source;
    },
    getDefaultLibFileName: () => '/lib/lib.es2022.d.ts',
    getDefaultLibLocation: () => '/lib',
    getCurrentDirectory: () => '/',
    getCanonicalFileName: filename => filename,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => '\n',
    writeFile: () => {},
    resolveModuleNames: (names, containingFile) =>
      names.map(name => {
        if (name === 'fp-pack' || name === 'fp-pack/stream') {
          return {
            resolvedFileName:
              name === 'fp-pack'
                ? '/fp-pack/index.ts'
                : '/fp-pack/stream/index.ts',
            extension: ts.Extension.Ts,
          };
        }
        return ts.resolveModuleName(name, containingFile, options, host)
          .resolvedModule;
      }),
  };
  return (text: string): TypeReport => {
    if (text.length > 30000)
      throw new Error('Please keep the example under 30,000 characters.');
    sources.set(entry, text);
    cache.delete(entry);
    const program = ts.createProgram([entry], options, host);
    const source = program.getSourceFile(entry);
    if (!source) throw new Error('The TypeScript source could not be opened.');
    const checker = program.getTypeChecker();
    const diagnostics = [
      ...program.getOptionsDiagnostics(),
      ...program.getGlobalDiagnostics(),
      ...program.getSyntacticDiagnostics(source),
      ...program.getSemanticDiagnostics(source),
    ].map(diagnostic => {
      const position = diagnostic.file?.getLineAndCharacterOfPosition(
        diagnostic.start ?? 0
      );
      return {
        line: position ? position.line + 1 : 0,
        column: position ? position.character + 1 : 0,
        code: diagnostic.code,
        message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
      };
    });
    const types: TypeReport['types'] = [];
    for (const statement of source.statements) {
      if (!ts.isVariableStatement(statement)) continue;
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name)) continue;
        types.push({
          name: declaration.name.text,
          type: checker
            .typeToString(
              checker.getTypeAtLocation(declaration.name),
              declaration,
              ts.TypeFormatFlags.NoTruncation
            )
            .slice(0, 1200),
        });
      }
    }
    return { version: ts.version, types, diagnostics };
  };
}
