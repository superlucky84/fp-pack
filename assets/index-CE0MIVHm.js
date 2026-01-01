(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();const he=Symbol.for("lithentWDomSymbol"),be={value:""},de={value:null},ie={value:!1},L=new WeakMap,At=new WeakSet,Tr=t=>{L.set(t,{vd:{value:null},up:()=>{},upR:[],upS:{value:0},upD:[],upCB:[],mts:[],umts:[],wdCB:[]})},Pe=()=>de.value,dt=(t,r)=>{const a=L.get(t);return a?a[r]:null},Ar=t=>{de.value=t},Cr=t=>{de.value=t,Tr(t)},Sr=t=>{const r=L.get(t);r&&(r.umts.forEach(a=>a()),r.umts=[])},Y=t=>t.getParent&&t.getParent(),ye=Object.entries,Ct=Object.keys,Ee=t=>typeof t=="object"&&t!==null,Ue=Object.assign,ce=t=>Ee(t)&&!("resolve"in t),Ce=(t,r)=>ce(t)&&t.type===r,Rr=(t,r)=>"ctor"in t?t.ctor===(r&&r.ctor):t===(r&&r.ctor),Nr=(t,r)=>!!(ce(t)&&r&&r.type==="f"&&r.children&&r.children.length===(t.children&&t.children.length)),Pr=(t,r)=>!!(ce(t)&&r&&r.type==="e"&&r.tag===t.tag&&r.children&&r.children.length===(t.children&&t.children.length)),ct=(t,r)=>!!(ce(t)&&r&&r.type===t.type),Ur=(t,r)=>!!(ce(t)&&r&&r.type===t.type&&(oe((t.children||[])[0])&&oe((r.children||[])[0])||r.children&&t.children&&r.children.length===t.children.length)),K=t=>(t&&t.compProps&&t.compProps.key)??(t&&t.props&&t.props.key),se=t=>t&&["f","l"].includes(t),_e=t=>typeof t=="function"&&!St(t)||Ee(t)&&"resolve"in t,St=t=>typeof t=="function"&&t===fe,_r=t=>ce(t)&&!t.type,oe=t=>Rt(K(t)),Rt=t=>t!=null,mt=(t,r)=>t==="style"&&Ee(r),Mr=(t,r)=>t==="ref"&&Ee(r),Or=(t,r)=>{const a=Object.getOwnPropertyDescriptor(t.constructor.prototype,r);return a&&a.get&&a.set},Ir=t=>_e(t)?"c":Ce(t,"f")?"f":Ce(t,"e")?"e":Ce(t,"l")?"l":Ce(t,"t")?"t":"et",Dr={c:Rr,l:Ur,t:ct,e:Pr,f:Nr,et:ct},Nt=t=>{const r=Pe();if(r){const a=L.get(r);a&&a.umts.push(t)}},Me=t=>{const{compKey:r}=t;r&&Br(r),Pt(t)},Pt=t=>{(t.children||[]).forEach(r=>{r.compKey?Me(r):Pt(r)})},Br=t=>{Sr(t),L.delete(t)};let Ge=[];const Lr=t=>{t.compKey&&Ge.push(t)},Ze=()=>{Ge.forEach(t=>Fr(t)),Ge=[]},zr=t=>{const r=Pe();if(r){const a=L.get(r);a&&a.mts.push(t)}},Fr=t=>{const{compKey:r}=t;if(r){const a=L.get(r);if(!a)return;const{mts:i,upS:s}=a;de.value=r,s&&(s.value=0),i&&(a.mts=[],i.forEach(o=>{const l=o();l&&Nt(l)}))}},$r=t=>{const{compKey:r}=t;if(r){const a=L.get(r),i=a&&a.wdCB;de.value=r,i&&i.length>0&&(a.wdCB=[],i.forEach(s=>{const o=s();o&&typeof o=="function"&&Nt(o)}))}},Hr=t=>{const{compKey:r}=t;if(r){const a=L.get(r);if(!a)return;const{upCB:i,upS:s}=a;de.value=r,s&&(s.value=0),t.ctor&&i&&(a.upCB=[],i.forEach(o=>o()))}},Ye=()=>new DocumentFragment,Wr=t=>document.createElement(t),Gr=(t,r,a,i)=>{t.isRoot=!0,r=r||document.body,t.we=r;const s=Ie(t,i);return r.tagName==="HTML"?r.replaceWith(s):r.appendChild(s),Ze(),()=>{const o=L.get(t.compProps||{}),l=o&&o.vd.value||t;l!==t&&Me(l),Oe(l),jr(l)}},Oe=t=>{t.props&&t.el&&Dt(t.props,t.el),(t.children||[]).forEach(r=>{Oe(r)})},jr=t=>Ut(t,t.we),Je=t=>{t.op&&t.el&&Dt(t.op,t.el),Ut(t,De(Y(t)))},Ut=(t,r)=>{r&&t.el&&(t.el.nodeType===11||(t==null?void 0:t.tag)==="portal"?_t(t):[1,3].includes(t.el.nodeType)&&r.removeChild(t.el),delete t.el)},_t=(t,r)=>{(t&&t.oc||t&&t.children||[]).forEach(a=>{const i=a.el&&a.el.nodeType;if(i)if([1,3].includes(i)){const s=a.el;s.tagName==="HTML"?s.innerHTML="":s.remove()}else i===11&&_t(a)})},Mt=t=>{Je(t),Xe(t)},Vr=t=>{if(Ve(t),Y(t).nr!=="L"){const r=Ot(t);Xe(t,r)}},Xe=(t,r)=>{r||(r=Ie(t));const a=Y(t);if(a.type){const i=De(a),s=a.type==="l"&&a.nr&&a.nr!=="L"?je(a,Y(a)):je(t,a);r&&i&&(t.tag!=="portal"&&(s?i.insertBefore(r,s):i.appendChild(r)),Ze())}},Ot=t=>se(t.type)?(t&&t.children||[]).reduce((r,a)=>{const i=Ot(a);return i&&r.appendChild(i),r},Ye()):t.el,je=(t,r)=>{const a=r.children||[],i=a.indexOf(t)+1,s=a.slice(i),o=It(s),l=r.type||"";if(o)return o;if(!r.isRoot&&se(l))return je(r,Y(r));if(r.isRoot&&se(l)&&r.ae)return r.ae},It=t=>t.reduce((r,a)=>{if(r)return r;const{type:i,el:s}=a;if(i&&se(i)){const o=It(a.children||[]);if(o)return o}return s&&s.nodeType!==11?s:r},void 0),Kr=t=>{const r=Y(t),a=t.el;if(r.type&&a)if(a.nodeType===11)Mt(t);else{const i=De(r),s=Ie(t);i&&t.tag!=="portal"&&i.replaceChild(s,a),Ze()}},Dt=(t,r)=>{ye(t||{}).forEach(([a,i])=>{a.match(/^on/)&&r.removeEventListener(a.slice(2).toLowerCase(),i)})},Ve=t=>{if(t.type==="t"){Zr(t);return}if(t.el){const{op:r,props:a}=t;Lt(a,t.el,r),delete t.op,t.tag==="input"&&(t.el.value=String(a&&a.value||""))}(t.children||[]).forEach(r=>Bt(r)),Hr(t)},Bt=t=>{const{nr:r}=t;r!==void 0&&r!=="N"&&(qr[r](t),delete t.nr,delete t.oc,delete t.op)},qr={A:Xe,D:Je,R:Kr,U:Ve,S:Mt,T:Vr,L:Ve},Zr=t=>{t.el&&(t.el.nodeValue=String(t.text))},Lt=(t,r,a,i)=>{const s=a||{};ye(t||{}).forEach(([o,l])=>{if(l===s[o]){delete s[o];return}o==="key"||l===s[o]||o==="portal"&&Ee(l)||(o==="innerHTML"&&typeof l=="string"?r.innerHTML=l:mt(o,l)?Qr(l,mt(o,s.style)?s.style:{},r):Mr(o,l)?l.value=r:o.match(/^on/)?Xr(r,o,l,s[o]):o&&(o!=="type"&&Or(r,o)?r[o]=l:Yr(o==="className"?"class":o,r,l))),delete s[o]}),Ct(s).forEach(o=>r.removeAttribute(o))},Yr=(t,r,a)=>be.value&&t!=="xmlns"?r.setAttributeNS(null,t,a):r.setAttribute(t,a),Ie=(t,r)=>{let a;const{type:i,tag:s,text:o,props:l,children:d=[]}=t,m=se(i);if($r(t),s==="svg"&&(be.value=String(l&&l.xmlns)),!r){if(m)a=Ye();else if(i==="e"&&s)s==="portal"&&l&&l.portal?a=l.portal:a=be.value?document.createElementNS(be.value,s):Wr(s);else if(i==="t"&&Rt(o))a=document.createTextNode(String(o));else throw Error("Invalid wDom");t.el=a}return Jr(d,a,r),Lt(l,a,null),Lr(t),s==="svg"&&(be.value=""),a},Jr=(t,r,a)=>{const i=t.reduce((s,o)=>{if(o.type){const l=Ie(o,a);o.tag!=="portal"&&!a&&s.appendChild(l)}return s},Ye());r&&i.hasChildNodes()&&r.appendChild(i)},Xr=(t,r,a,i)=>{const s=r.slice(2).toLowerCase();i!==a&&(i&&t.removeEventListener(s,i),a&&t.addEventListener(s,a))},Qr=(t,r,a)=>{const i={...r},s=a instanceof HTMLElement?a:null,o=s==null?void 0:s.style;if(!o)return;const l=o;ye(t).forEach(([d,m])=>{l[d]=m,delete i[d]}),ye(i).forEach(([d])=>{l[d]=""})},De=t=>{const r=se(t.type);return t.isRoot&&r?t.we:r?De(Y(t)):t.el},Be=(t,r)=>ea(t,Dr[Ir(t)](t,r),r),ea=(t,r,a)=>{const i=oa(t,r,a),s=ra(i,r,a),o=s==="N";return o||(i.children=la(i,r,a)),i.nr=s,ta(i,a,s),!o&&a&&(a.il=!0,delete a.children),(a==null?void 0:a.tag)==="portal"&&(i.tag="portal"),i},ta=(t,r,a)=>{a!=="A"&&r&&(t.el=r.el),(a==="D"||a==="R"||a==="S")&&(r&&(Me(r),Oe(r)),t.oc=r&&r.children),t.op=r&&r.props},ra=(t,r,a)=>{if(_r(t))return"D";if(t.type==="t"&&r&&t.text===(a&&a.text)||t===a)return"N";if(!(a&&a.type))return"A";const i=Y(a),s=!t.isRoot&&i&&i.type==="l"&&oe(t);let o=r?s?"T":"U":s?"S":"R";return t.type==="l"&&o==="U"&&a&&aa(t,a)&&(o="L"),o},aa=(t,r)=>{if(!oe((t.children||[])[0])||!oe((r.children||[])[0]))return!1;const a=[...r&&r.children||[]],i=[...t&&t.children||[]].filter(l=>a.find(d=>K(l)===K(d))),s=a.filter(l=>i.find(d=>K(l)===K(d)));let o=s.length===i.length;return o&&(o=s.every((l,d)=>K(l)===K(i[d]))),o},na=(t,r)=>{t&&r!==t&&(Ct(t).forEach(a=>delete t[a]),ye(r||{}).forEach(([a,i])=>t[a]=i))},ia=(t,r)=>{t&&(t.splice(0,t.length),r&&r.forEach(a=>t.push(a)))},sa=(t,r)=>{const{compProps:a,compChild:i}=t,{props:s,children:o}=r;return a&&na(a,s),i&&o&&i!==o&&ia(i,o),t.reRender&&t.reRender()},oa=(t,r,a)=>_e(t)?r&&a?sa(a,t):t.resolve():t,la=(t,r,a)=>r&&a?ca(t,a):da(t),da=t=>(t.children||[]).map(r=>Ue(Be(r),{getParent:()=>t})),ca=(t,r)=>t.type==="l"&&oe((t.children||[])[0])?ma(t,r):(t.children||[]).map((a,i)=>Ue(Be(a,(r.children||[])[i]),{getParent:()=>t})),ma=(t,r)=>{const[a,i]=pa(t,r);return i.forEach(s=>{Me(s),Oe(s),Je(s)}),a},pa=(t,r)=>{const a=[...r.children||[]];return[(t.children||[]).map(i=>{const s=ua(i,a),o=Be(i,s);return s&&a.splice(a.indexOf(s),1),o.getParent=()=>t,o}),a]},ua=(t,r)=>r.find(a=>K(a)===K(t)),Ke=new Map;let qe=!1;const ga=(t,r)=>{const a=L.get(t);a&&(a.up=()=>{Ke.set(t,r),qe||(qe=!0,queueMicrotask(xa))})},zt=t=>()=>{const r=L.get(t),a=r&&r.up;return a?(a(),!0):!1},xa=()=>{Ke.forEach(t=>{t()}),Ke.clear(),qe=!1},ba=()=>{const t=Pe();if(!t)return;const r=L.get(t),a=r&&r.upR;a&&a.length&&a.forEach(i=>i())},fe=(t,...r)=>({type:"f",[he]:!0,children:r}),pt=(t,r,...a)=>{const i={value:void 0},s=Ft(i,a),o=ka(t,r||{},s);return _e(o)||(i.value=o),o},Qe=t=>(r,a)=>t,ha=t=>(r,a)=>(At.add(t),t),ya=(t,r,a)=>{const i=(s,o)=>{if(!(!s||o.has(s))){if(o.add(s),s.compChild){const l=s.compChild.indexOf(r);l!==-1&&s.compChild.splice(l,1,a)}i(s.getParent?s.getParent():void 0,o)}};i(t,new Set)},fa=(t,r,a,i)=>{if(i.il)return;ie.value=!0;const s=Ht(t,r,a),o=Be(s,i),{isRoot:l,getParent:d,we:m,ae:h}=i;if(o.getParent=d,!l&&d){const v=d(),C=v&&v.children||[],E=C.indexOf(i);E!==-1&&C.splice(E,1,o),ya(v,i,o)}else o.isRoot=!0,o.we=m,o.ae=h;ie.value=!1,Bt(o)},ka=(t,r,a)=>{if(St(t))return fe(r,...a);if(_e(t)){const i=Ht(t,r,a);return ie.value?i:i.resolve()}return{type:"e",[he]:!0,tag:t,props:r,children:a}},Ft=(t,r)=>r.map(a=>Ue($t(a),{getParent:()=>t.value})),$t=t=>{if(t==null||t===!1)return{type:null,[he]:!0};if(Array.isArray(t)){const r={value:void 0},a=Ft(r,t),i={type:"l",[he]:!0,children:a};return r.value=i,i}else if(typeof t=="string"||typeof t=="number")return{type:"t",[he]:!0,text:t};return t},va=(t,r,a)=>(i=r)=>{const s=ie.value;ie.value=!1,Cr(i);const o=t(r,a);let l;if(typeof o=="function"){const m=o;l=At.has(m)?m(r,a):m(zt(i),r,a)}else l=m=>t(m,a);const d=wa(l,i,t,r,a);return ie.value=s,d},Ht=(t,r,a)=>{const i=t,s=a,o=va(t,r,s);return{ctor:i,props:r,children:s,resolve:o}},wa=(t,r,a,i,s)=>{const{wrappedComponentMaker:o,customNode:l}=Aa(t,i),d=Ea(o,r,a,i,s);return Wt(l,r,a,i,s,d),l},Ea=(t,r,a,i,s)=>{const o=()=>Ta(t,r,a,i,s,o);return o},Ta=(t,r,a,i,s,o)=>{Ar(r),ba();const l=t(i);return Wt(l,r,a,i,s,o),l},Aa=(t,r)=>{let a=t(r);if(!a.reRender)return{wrappedComponentMaker:t,customNode:a};const i=s=>{const o=t(s);if(!o||!o.reRender){const d=$t(o),m=fe({},d);return d.getParent=()=>m,m}const l=fe({},o);return o.getParent=()=>l,l};return a=i(r),{wrappedComponentMaker:i,customNode:a}},Wt=(t,r,a,i,s,o)=>{Ue(t,{compProps:i,compChild:s,ctor:a,compKey:r,reRender:o}),ga(r,()=>fa(a,t.compProps||i,t.compChild||s,t)),dt(r,"vd")&&(dt(r,"vd").value=t)},Ca=t=>({value:t}),Sa=()=>{const t=Pe();return t?zt(t):()=>!1};function e(t,r,a,i,s,o){const{children:l,...d}=r;if(l!=null){const m=Array.isArray(l)?l:[l];return pt(t,{...d,key:a},...m)}return pt(t,{...d,key:a})}const Ra={cache:!0};function Na(t){const r={value:!1},a=!Array.isArray(t)&&typeof t=="object"&&t!==null?t:{value:t},i=new Set,s=[],o=new WeakMap,l=(d,m,h)=>{const{cache:v}=Object.assign({},Ra,h||{});if(v&&d&&o.has(d))return o.get(d);const C={},E=new Set;let S={value:null},P=()=>{};return s.push(C),d&&m&&(P=()=>d(S.value),S.value=ut(a,r,i,E,s,P,C),r.value=!0,m(S.value),r.value=!1),S.value||(S.value=ut(a,r,i,E,s),d&&(P=()=>d(S.value),i.add(P))),d&&(Ua(P,i,C,E),o.set(d,S.value)),S.value};return{useStore(d,m){const h=Sa();return l(h,d,m)},watch(d,m,h){return l(d,m,h)}}}function ut(t,r,a,i,s,o,l){return new Proxy(t,{get(d,m){return o&&l&&r.value&&(l[m]??(l[m]=new Set),l[m].has(o)||(l[m].add(o),i.add(m))),d[m]},set(d,m,h){return d[m]===h||(d[m]=h,Pa(a,s,m)),!0}})}function Pa(t,r=[],a){const i=new Set;xt(t).forEach(s=>i.add(s)),(r||[]).forEach(s=>{const o=s[a]||new Set;xt(o).forEach(l=>i.add(l)),gt(i,o)}),gt(i,t)}function gt(t,r){t.forEach(a=>{r.delete(a)})}function xt(t){const r=[];return t.forEach(a=>{a()===!1&&r.push(a)}),r}function Ua(t,r,a,i){const s=t();s instanceof AbortSignal&&s.addEventListener("abort",()=>{const o=a||{};r.delete(t),Object.entries(o).forEach(([l,d])=>{d.delete(t),i.delete(l)})})}const Le=Na({route:location.pathname,theme:"light",sidebarOpen:!1}),ke=Le.watch(),_a=()=>ke.route.startsWith("/ko"),Gt=(t,r)=>{const a=t.replace(/\/+$/,"")||"/";return r==="ko"?a.startsWith("/ko")?a:`/ko${a}`:a.replace(/^\/ko/,"")||"/"},jt=t=>{const r=t.replace(/\/+$/,"")||"/";window.location.pathname!==r&&history.pushState(null,"",r),ke.route=r,window.scrollTo(0,0)};function p(t){const r=_a()?"ko":"en",a=Gt(t,r);jt(a)}const bt=t=>{const r=Gt(ke.route,t);r!==ke.route&&jt(r)};window.addEventListener("popstate",()=>{ke.route=location.pathname});const Ma=Qe(t=>{const r=Le.watch(t);return()=>{const a=r.route.startsWith("/ko");return e("header",{class:"sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1b1b1f] transition-colors",children:e("div",{class:"mx-auto max-w-[1440px] px-6 md:px-12",children:e("div",{class:"flex items-center justify-between h-16",children:[e("div",{class:"flex items-center space-x-4",children:[e("a",{href:"/",onClick:i=>{i.preventDefault(),p("/")},class:"text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all cursor-pointer",children:"fp-kit"}),e("span",{class:"text-sm text-gray-500 dark:text-gray-400",children:"Functional Programming Utilities"})]}),e("nav",{class:"flex items-center space-x-4",children:[e("div",{class:"flex items-center border border-gray-200 dark:border-gray-700 rounded-full text-xs font-semibold overflow-hidden",children:[e("button",{type:"button",class:`px-3 py-1 transition-colors ${a?"text-gray-600 dark:text-gray-400":"bg-gradient-to-r from-blue-600 to-purple-600 text-white"}`,"aria-pressed":!a,onClick:()=>bt("en"),children:"EN"}),e("button",{type:"button",class:`px-3 py-1 transition-colors ${a?"bg-gradient-to-r from-blue-600 to-purple-600 text-white":"text-gray-600 dark:text-gray-400"}`,"aria-pressed":a,onClick:()=>bt("ko"),children:"KO"})]}),e("a",{href:"https://github.com/your-repo/fp-kit",target:"_blank",rel:"noopener noreferrer",class:"hidden sm:block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors",children:"GitHub"}),e("button",{class:"md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2",onClick:()=>{r.sidebarOpen=!r.sidebarOpen},"aria-label":"Toggle sidebar",children:e("svg",{class:"w-6 h-6 text-gray-600 dark:text-gray-300",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 12h16M4 18h16"})})})]})]})})})}}),Oa=Qe(t=>{const r=Le.watch(t);return()=>{const a=r.route.startsWith("/ko"),i=[{title:a?"시작하기":"Getting Started",items:[{title:a?"소개":"Introduction",path:"/"}]},{title:a?"조합":"Composition",items:[{title:"pipe",path:"/composition/pipe"},{title:"compose",path:"/composition/compose"},{title:"curry",path:"/composition/curry"},{title:"partial",path:"/composition/partial"},{title:"flip",path:"/composition/flip"},{title:"identity",path:"/composition/identity"},{title:"constant",path:"/composition/constant"},{title:"memoize",path:"/composition/memoize"},{title:"once",path:"/composition/once"},{title:"tap",path:"/composition/tap"}]},{title:a?"배열":"Array",items:[{title:"chunk",path:"/array/chunk"},{title:"drop",path:"/array/drop"},{title:"every",path:"/array/every"},{title:"filter",path:"/array/filter"},{title:"find",path:"/array/find"},{title:"flatMap",path:"/array/flatMap"},{title:"groupBy",path:"/array/groupBy"}]},{title:"Maybe",items:[{title:"maybe",path:"/maybe/maybe"}]}];return e(fe,{children:[r.sidebarOpen&&e("div",{class:"fixed inset-0 bg-black/50 z-40 md:hidden",onClick:()=>{r.sidebarOpen=!1}}),e("aside",{class:`
            fixed md:sticky top-16 left-0 z-50 md:z-auto
            w-64 h-[calc(100vh-4rem)]
            flex-shrink-0 border-r border-gray-200 dark:border-gray-800
            bg-white dark:bg-[#1b1b1f] overflow-y-auto
            transition-transform duration-300 ease-in-out
            ${r.sidebarOpen?"translate-x-0":"-translate-x-full md:translate-x-0"}
          `,children:e("nav",{class:"p-6 space-y-8",children:i.map(s=>e("div",{children:[e("h3",{class:"text-sm font-semibold text-gray-900 dark:text-white mb-3",children:s.title}),e("ul",{class:"space-y-2",children:s.items.map(o=>{const l=r.route===o.path||r.route===`/ko${o.path}`;return e("li",{children:e("a",{href:o.path,onClick:d=>{d.preventDefault(),p(o.path),r.sidebarOpen=!1},class:`block px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${l?"bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium":"text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`,children:o.title})},o.path)})})]},s.title))})})]})}}),Vt=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6",children:"fp-kit"}),e("p",{class:"text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8",children:"Practical functional programming utilities for everyday JavaScript developers."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-3xl font-semibold text-gray-900 dark:text-white mb-4",children:"Why fp-kit?"}),e("ul",{class:"space-y-3 text-gray-700 dark:text-gray-300",children:[e("li",{class:"flex items-start",children:[e("span",{class:"text-blue-500 font-bold mr-3",children:"✨"}),e("div",{children:[e("strong",{children:"No Magic"})," - Clear, understandable implementations without heavy abstractions"]})]}),e("li",{class:"flex items-start",children:[e("span",{class:"text-blue-500 font-bold mr-3",children:"👥"}),e("div",{children:[e("strong",{children:"Developer-Friendly"})," - Written for regular JavaScript developers, not FP academics"]})]}),e("li",{class:"flex items-start",children:[e("span",{class:"text-blue-500 font-bold mr-3",children:"🎯"}),e("div",{children:[e("strong",{children:"Practical"})," - Functions you'll actually use daily, not theoretical constructs"]})]}),e("li",{class:"flex items-start",children:[e("span",{class:"text-blue-500 font-bold mr-3",children:"📘"}),e("div",{children:[e("strong",{children:"Typed"})," - Full TypeScript support with excellent type inference"]})]}),e("li",{class:"flex items-start",children:[e("span",{class:"text-blue-500 font-bold mr-3",children:"🪶"}),e("div",{children:[e("strong",{children:"Lightweight"})," - Tree-shakeable and minimal bundle impact (~5KB)"]})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-3xl font-semibold text-gray-900 dark:text-white mb-4",children:"Get Started"}),e("p",{class:"text-gray-700 dark:text-gray-300 mb-6",children:"Explore the composition utilities to start building powerful function pipelines:"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors cursor-pointer",children:[e("h3",{class:"text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"pipe →"}),e("p",{class:"text-gray-700 dark:text-gray-300",children:"Compose functions from left to right for readable data transformations."})]}),e("a",{href:"/composition/compose",onClick:t=>{t.preventDefault(),p("/composition/compose")},class:"block p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors cursor-pointer",children:[e("h3",{class:"text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"compose →"}),e("p",{class:"text-gray-700 dark:text-gray-300",children:"Compose functions from right to left in traditional mathematical style."})]}),e("a",{href:"/composition/curry",onClick:t=>{t.preventDefault(),p("/composition/curry")},class:"block p-6 bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 rounded-lg border border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-600 transition-colors cursor-pointer",children:[e("h3",{class:"text-xl font-medium text-pink-600 dark:text-pink-400 mb-2",children:"curry →"}),e("p",{class:"text-gray-700 dark:text-gray-300",children:"Transform functions to support partial application for flexible composition."})]})]})]}),Ia=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6",children:"fp-kit"}),e("p",{class:"text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8",children:"일상적인 JavaScript 개발자를 위한 실용적인 함수형 프로그래밍 유틸리티"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-3xl font-semibold text-gray-900 dark:text-white mb-4",children:"왜 fp-kit인가?"}),e("ul",{class:"space-y-3 text-gray-700 dark:text-gray-300",children:[e("li",{class:"flex items-start",children:[e("span",{class:"text-blue-500 font-bold mr-3",children:"✨"}),e("div",{children:[e("strong",{children:"마법 없음"})," - 무거운 추상화 없이 명확하고 이해하기 쉬운 구현"]})]}),e("li",{class:"flex items-start",children:[e("span",{class:"text-blue-500 font-bold mr-3",children:"👥"}),e("div",{children:[e("strong",{children:"개발자 친화적"})," - FP 학자가 아닌 일반 JavaScript 개발자를 위해 작성됨"]})]}),e("li",{class:"flex items-start",children:[e("span",{class:"text-blue-500 font-bold mr-3",children:"🎯"}),e("div",{children:[e("strong",{children:"실용적"})," - 이론적 구성이 아닌 실제로 매일 사용할 함수들"]})]}),e("li",{class:"flex items-start",children:[e("span",{class:"text-blue-500 font-bold mr-3",children:"📘"}),e("div",{children:[e("strong",{children:"타입 완벽 지원"})," - 뛰어난 타입 추론을 가진 완전한 TypeScript 지원"]})]}),e("li",{class:"flex items-start",children:[e("span",{class:"text-blue-500 font-bold mr-3",children:"🪶"}),e("div",{children:[e("strong",{children:"경량"})," - 트리 쉐이킹 가능하며 최소한의 번들 영향 (~5KB)"]})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-3xl font-semibold text-gray-900 dark:text-white mb-4",children:"시작하기"}),e("p",{class:"text-gray-700 dark:text-gray-300 mb-6",children:"강력한 함수 파이프라인을 구축하기 위해 컴포지션 유틸리티를 살펴보세요:"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors cursor-pointer",children:[e("h3",{class:"text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"pipe →"}),e("p",{class:"text-gray-700 dark:text-gray-300",children:"가독성 있는 데이터 변환을 위해 왼쪽에서 오른쪽으로 함수를 합성합니다."})]}),e("a",{href:"/composition/compose",onClick:t=>{t.preventDefault(),p("/composition/compose")},class:"block p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors cursor-pointer",children:[e("h3",{class:"text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"compose →"}),e("p",{class:"text-gray-700 dark:text-gray-300",children:"전통적인 수학적 스타일로 오른쪽에서 왼쪽으로 함수를 합성합니다."})]}),e("a",{href:"/composition/curry",onClick:t=>{t.preventDefault(),p("/composition/curry")},class:"block p-6 bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 rounded-lg border border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-600 transition-colors cursor-pointer",children:[e("h3",{class:"text-xl font-medium text-pink-600 dark:text-pink-400 mb-2",children:"curry →"}),e("p",{class:"text-gray-700 dark:text-gray-300",children:"유연한 합성을 위해 부분 적용을 지원하도록 함수를 변환합니다."})]})]})]});function Da(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Kt(t){return t instanceof Map?t.clear=t.delete=t.set=function(){throw new Error("map is read-only")}:t instanceof Set&&(t.add=t.clear=t.delete=function(){throw new Error("set is read-only")}),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(r=>{const a=t[r],i=typeof a;(i==="object"||i==="function")&&!Object.isFrozen(a)&&Kt(a)}),t}class ht{constructor(r){r.data===void 0&&(r.data={}),this.data=r.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function qt(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function Z(t,...r){const a=Object.create(null);for(const i in t)a[i]=t[i];return r.forEach(function(i){for(const s in i)a[s]=i[s]}),a}const Ba="</span>",yt=t=>!!t.scope,La=(t,{prefix:r})=>{if(t.startsWith("language:"))return t.replace("language:","language-");if(t.includes(".")){const a=t.split(".");return[`${r}${a.shift()}`,...a.map((i,s)=>`${i}${"_".repeat(s+1)}`)].join(" ")}return`${r}${t}`};class za{constructor(r,a){this.buffer="",this.classPrefix=a.classPrefix,r.walk(this)}addText(r){this.buffer+=qt(r)}openNode(r){if(!yt(r))return;const a=La(r.scope,{prefix:this.classPrefix});this.span(a)}closeNode(r){yt(r)&&(this.buffer+=Ba)}value(){return this.buffer}span(r){this.buffer+=`<span class="${r}">`}}const ft=(t={})=>{const r={children:[]};return Object.assign(r,t),r};class et{constructor(){this.rootNode=ft(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(r){this.top.children.push(r)}openNode(r){const a=ft({scope:r});this.add(a),this.stack.push(a)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(r){return this.constructor._walk(r,this.rootNode)}static _walk(r,a){return typeof a=="string"?r.addText(a):a.children&&(r.openNode(a),a.children.forEach(i=>this._walk(r,i)),r.closeNode(a)),r}static _collapse(r){typeof r!="string"&&r.children&&(r.children.every(a=>typeof a=="string")?r.children=[r.children.join("")]:r.children.forEach(a=>{et._collapse(a)}))}}class Fa extends et{constructor(r){super(),this.options=r}addText(r){r!==""&&this.add(r)}startScope(r){this.openNode(r)}endScope(){this.closeNode()}__addSublanguage(r,a){const i=r.root;a&&(i.scope=`language:${a}`),this.add(i)}toHTML(){return new za(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ve(t){return t?typeof t=="string"?t:t.source:null}function Zt(t){return te("(?=",t,")")}function $a(t){return te("(?:",t,")*")}function Ha(t){return te("(?:",t,")?")}function te(...t){return t.map(a=>ve(a)).join("")}function Wa(t){const r=t[t.length-1];return typeof r=="object"&&r.constructor===Object?(t.splice(t.length-1,1),r):{}}function tt(...t){return"("+(Wa(t).capture?"":"?:")+t.map(i=>ve(i)).join("|")+")"}function Yt(t){return new RegExp(t.toString()+"|").exec("").length-1}function Ga(t,r){const a=t&&t.exec(r);return a&&a.index===0}const ja=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function rt(t,{joinWith:r}){let a=0;return t.map(i=>{a+=1;const s=a;let o=ve(i),l="";for(;o.length>0;){const d=ja.exec(o);if(!d){l+=o;break}l+=o.substring(0,d.index),o=o.substring(d.index+d[0].length),d[0][0]==="\\"&&d[1]?l+="\\"+String(Number(d[1])+s):(l+=d[0],d[0]==="("&&a++)}return l}).map(i=>`(${i})`).join(r)}const Va=/\b\B/,Jt="[a-zA-Z]\\w*",at="[a-zA-Z_]\\w*",Xt="\\b\\d+(\\.\\d+)?",Qt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",er="\\b(0b[01]+)",Ka="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",qa=(t={})=>{const r=/^#![ ]*\//;return t.binary&&(t.begin=te(r,/.*\b/,t.binary,/\b.*/)),Z({scope:"meta",begin:r,end:/$/,relevance:0,"on:begin":(a,i)=>{a.index!==0&&i.ignoreMatch()}},t)},we={begin:"\\\\[\\s\\S]",relevance:0},Za={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[we]},Ya={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[we]},Ja={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},ze=function(t,r,a={}){const i=Z({scope:"comment",begin:t,end:r,contains:[]},a);i.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const s=tt("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return i.contains.push({begin:te(/[ ]+/,"(",s,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),i},Xa=ze("//","$"),Qa=ze("/\\*","\\*/"),en=ze("#","$"),tn={scope:"number",begin:Xt,relevance:0},rn={scope:"number",begin:Qt,relevance:0},an={scope:"number",begin:er,relevance:0},nn={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[we,{begin:/\[/,end:/\]/,relevance:0,contains:[we]}]},sn={scope:"title",begin:Jt,relevance:0},on={scope:"title",begin:at,relevance:0},ln={begin:"\\.\\s*"+at,relevance:0},dn=function(t){return Object.assign(t,{"on:begin":(r,a)=>{a.data._beginMatch=r[1]},"on:end":(r,a)=>{a.data._beginMatch!==r[1]&&a.ignoreMatch()}})};var Se=Object.freeze({__proto__:null,APOS_STRING_MODE:Za,BACKSLASH_ESCAPE:we,BINARY_NUMBER_MODE:an,BINARY_NUMBER_RE:er,COMMENT:ze,C_BLOCK_COMMENT_MODE:Qa,C_LINE_COMMENT_MODE:Xa,C_NUMBER_MODE:rn,C_NUMBER_RE:Qt,END_SAME_AS_BEGIN:dn,HASH_COMMENT_MODE:en,IDENT_RE:Jt,MATCH_NOTHING_RE:Va,METHOD_GUARD:ln,NUMBER_MODE:tn,NUMBER_RE:Xt,PHRASAL_WORDS_MODE:Ja,QUOTE_STRING_MODE:Ya,REGEXP_MODE:nn,RE_STARTERS_RE:Ka,SHEBANG:qa,TITLE_MODE:sn,UNDERSCORE_IDENT_RE:at,UNDERSCORE_TITLE_MODE:on});function cn(t,r){t.input[t.index-1]==="."&&r.ignoreMatch()}function mn(t,r){t.className!==void 0&&(t.scope=t.className,delete t.className)}function pn(t,r){r&&t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",t.__beforeBegin=cn,t.keywords=t.keywords||t.beginKeywords,delete t.beginKeywords,t.relevance===void 0&&(t.relevance=0))}function un(t,r){Array.isArray(t.illegal)&&(t.illegal=tt(...t.illegal))}function gn(t,r){if(t.match){if(t.begin||t.end)throw new Error("begin & end are not supported with match");t.begin=t.match,delete t.match}}function xn(t,r){t.relevance===void 0&&(t.relevance=1)}const bn=(t,r)=>{if(!t.beforeMatch)return;if(t.starts)throw new Error("beforeMatch cannot be used with starts");const a=Object.assign({},t);Object.keys(t).forEach(i=>{delete t[i]}),t.keywords=a.keywords,t.begin=te(a.beforeMatch,Zt(a.begin)),t.starts={relevance:0,contains:[Object.assign(a,{endsParent:!0})]},t.relevance=0,delete a.beforeMatch},hn=["of","and","for","in","not","or","if","then","parent","list","value"],yn="keyword";function tr(t,r,a=yn){const i=Object.create(null);return typeof t=="string"?s(a,t.split(" ")):Array.isArray(t)?s(a,t):Object.keys(t).forEach(function(o){Object.assign(i,tr(t[o],r,o))}),i;function s(o,l){r&&(l=l.map(d=>d.toLowerCase())),l.forEach(function(d){const m=d.split("|");i[m[0]]=[o,fn(m[0],m[1])]})}}function fn(t,r){return r?Number(r):kn(t)?0:1}function kn(t){return hn.includes(t.toLowerCase())}const kt={},Q=t=>{console.error(t)},vt=(t,...r)=>{console.log(`WARN: ${t}`,...r)},ne=(t,r)=>{kt[`${t}/${r}`]||(console.log(`Deprecated as of ${t}. ${r}`),kt[`${t}/${r}`]=!0)},Re=new Error;function rr(t,r,{key:a}){let i=0;const s=t[a],o={},l={};for(let d=1;d<=r.length;d++)l[d+i]=s[d],o[d+i]=!0,i+=Yt(r[d-1]);t[a]=l,t[a]._emit=o,t[a]._multi=!0}function vn(t){if(Array.isArray(t.begin)){if(t.skip||t.excludeBegin||t.returnBegin)throw Q("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Re;if(typeof t.beginScope!="object"||t.beginScope===null)throw Q("beginScope must be object"),Re;rr(t,t.begin,{key:"beginScope"}),t.begin=rt(t.begin,{joinWith:""})}}function wn(t){if(Array.isArray(t.end)){if(t.skip||t.excludeEnd||t.returnEnd)throw Q("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Re;if(typeof t.endScope!="object"||t.endScope===null)throw Q("endScope must be object"),Re;rr(t,t.end,{key:"endScope"}),t.end=rt(t.end,{joinWith:""})}}function En(t){t.scope&&typeof t.scope=="object"&&t.scope!==null&&(t.beginScope=t.scope,delete t.scope)}function Tn(t){En(t),typeof t.beginScope=="string"&&(t.beginScope={_wrap:t.beginScope}),typeof t.endScope=="string"&&(t.endScope={_wrap:t.endScope}),vn(t),wn(t)}function An(t){function r(l,d){return new RegExp(ve(l),"m"+(t.case_insensitive?"i":"")+(t.unicodeRegex?"u":"")+(d?"g":""))}class a{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(d,m){m.position=this.position++,this.matchIndexes[this.matchAt]=m,this.regexes.push([m,d]),this.matchAt+=Yt(d)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const d=this.regexes.map(m=>m[1]);this.matcherRe=r(rt(d,{joinWith:"|"}),!0),this.lastIndex=0}exec(d){this.matcherRe.lastIndex=this.lastIndex;const m=this.matcherRe.exec(d);if(!m)return null;const h=m.findIndex((C,E)=>E>0&&C!==void 0),v=this.matchIndexes[h];return m.splice(0,h),Object.assign(m,v)}}class i{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(d){if(this.multiRegexes[d])return this.multiRegexes[d];const m=new a;return this.rules.slice(d).forEach(([h,v])=>m.addRule(h,v)),m.compile(),this.multiRegexes[d]=m,m}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(d,m){this.rules.push([d,m]),m.type==="begin"&&this.count++}exec(d){const m=this.getMatcher(this.regexIndex);m.lastIndex=this.lastIndex;let h=m.exec(d);if(this.resumingScanAtSamePosition()&&!(h&&h.index===this.lastIndex)){const v=this.getMatcher(0);v.lastIndex=this.lastIndex+1,h=v.exec(d)}return h&&(this.regexIndex+=h.position+1,this.regexIndex===this.count&&this.considerAll()),h}}function s(l){const d=new i;return l.contains.forEach(m=>d.addRule(m.begin,{rule:m,type:"begin"})),l.terminatorEnd&&d.addRule(l.terminatorEnd,{type:"end"}),l.illegal&&d.addRule(l.illegal,{type:"illegal"}),d}function o(l,d){const m=l;if(l.isCompiled)return m;[mn,gn,Tn,bn].forEach(v=>v(l,d)),t.compilerExtensions.forEach(v=>v(l,d)),l.__beforeBegin=null,[pn,un,xn].forEach(v=>v(l,d)),l.isCompiled=!0;let h=null;return typeof l.keywords=="object"&&l.keywords.$pattern&&(l.keywords=Object.assign({},l.keywords),h=l.keywords.$pattern,delete l.keywords.$pattern),h=h||/\w+/,l.keywords&&(l.keywords=tr(l.keywords,t.case_insensitive)),m.keywordPatternRe=r(h,!0),d&&(l.begin||(l.begin=/\B|\b/),m.beginRe=r(m.begin),!l.end&&!l.endsWithParent&&(l.end=/\B|\b/),l.end&&(m.endRe=r(m.end)),m.terminatorEnd=ve(m.end)||"",l.endsWithParent&&d.terminatorEnd&&(m.terminatorEnd+=(l.end?"|":"")+d.terminatorEnd)),l.illegal&&(m.illegalRe=r(l.illegal)),l.contains||(l.contains=[]),l.contains=[].concat(...l.contains.map(function(v){return Cn(v==="self"?l:v)})),l.contains.forEach(function(v){o(v,m)}),l.starts&&o(l.starts,d),m.matcher=s(m),m}if(t.compilerExtensions||(t.compilerExtensions=[]),t.contains&&t.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return t.classNameAliases=Z(t.classNameAliases||{}),o(t)}function ar(t){return t?t.endsWithParent||ar(t.starts):!1}function Cn(t){return t.variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(r){return Z(t,{variants:null},r)})),t.cachedVariants?t.cachedVariants:ar(t)?Z(t,{starts:t.starts?Z(t.starts):null}):Object.isFrozen(t)?Z(t):t}var Sn="11.11.1";class Rn extends Error{constructor(r,a){super(r),this.name="HTMLInjectionError",this.html=a}}const We=qt,wt=Z,Et=Symbol("nomatch"),Nn=7,nr=function(t){const r=Object.create(null),a=Object.create(null),i=[];let s=!0;const o="Could not find the language '{}', did you forget to load/include a language module?",l={disableAutodetect:!0,name:"Plain text",contains:[]};let d={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Fa};function m(c){return d.noHighlightRe.test(c)}function h(c){let x=c.className+" ";x+=c.parentNode?c.parentNode.className:"";const g=d.languageDetectRe.exec(x);if(g){const f=I(g[1]);return f||(vt(o.replace("{}",g[1])),vt("Falling back to no-highlight mode for this block.",c)),f?g[1]:"no-highlight"}return x.split(/\s+/).find(f=>m(f)||I(f))}function v(c,x,g){let f="",w="";typeof x=="object"?(f=c,g=x.ignoreIllegals,w=x.language):(ne("10.7.0","highlight(lang, code, ...args) has been deprecated."),ne("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),w=c,f=x),g===void 0&&(g=!0);const R={code:f,language:w};q("before:highlight",R);const _=R.result?R.result:C(R.language,R.code,g);return _.code=R.code,q("after:highlight",_),_}function C(c,x,g,f){const w=Object.create(null);function R(u,b){return u.keywords[b]}function _(){if(!y.keywords){U.addText(A);return}let u=0;y.keywordPatternRe.lastIndex=0;let b=y.keywordPatternRe.exec(A),k="";for(;b;){k+=A.substring(u,b.index);const T=j.case_insensitive?b[0].toLowerCase():b[0],M=R(y,T);if(M){const[V,wr]=M;if(U.addText(k),k="",w[T]=(w[T]||0)+1,w[T]<=Nn&&(Ae+=wr),V.startsWith("_"))k+=b[0];else{const Er=j.classNameAliases[V]||V;G(b[0],Er)}}else k+=b[0];u=y.keywordPatternRe.lastIndex,b=y.keywordPatternRe.exec(A)}k+=A.substring(u),U.addText(k)}function W(){if(A==="")return;let u=null;if(typeof y.subLanguage=="string"){if(!r[y.subLanguage]){U.addText(A);return}u=C(y.subLanguage,A,!0,lt[y.subLanguage]),lt[y.subLanguage]=u._top}else u=S(A,y.subLanguage.length?y.subLanguage:null);y.relevance>0&&(Ae+=u.relevance),U.__addSublanguage(u._emitter,u.language)}function B(){y.subLanguage!=null?W():_(),A=""}function G(u,b){u!==""&&(U.startScope(b),U.addText(u),U.endScope())}function nt(u,b){let k=1;const T=b.length-1;for(;k<=T;){if(!u._emit[k]){k++;continue}const M=j.classNameAliases[u[k]]||u[k],V=b[k];M?G(V,M):(A=V,_(),A=""),k++}}function it(u,b){return u.scope&&typeof u.scope=="string"&&U.openNode(j.classNameAliases[u.scope]||u.scope),u.beginScope&&(u.beginScope._wrap?(G(A,j.classNameAliases[u.beginScope._wrap]||u.beginScope._wrap),A=""):u.beginScope._multi&&(nt(u.beginScope,b),A="")),y=Object.create(u,{parent:{value:y}}),y}function st(u,b,k){let T=Ga(u.endRe,k);if(T){if(u["on:end"]){const M=new ht(u);u["on:end"](b,M),M.isMatchIgnored&&(T=!1)}if(T){for(;u.endsParent&&u.parent;)u=u.parent;return u}}if(u.endsWithParent)return st(u.parent,b,k)}function hr(u){return y.matcher.regexIndex===0?(A+=u[0],1):(He=!0,0)}function yr(u){const b=u[0],k=u.rule,T=new ht(k),M=[k.__beforeBegin,k["on:begin"]];for(const V of M)if(V&&(V(u,T),T.isMatchIgnored))return hr(b);return k.skip?A+=b:(k.excludeBegin&&(A+=b),B(),!k.returnBegin&&!k.excludeBegin&&(A=b)),it(k,u),k.returnBegin?0:b.length}function fr(u){const b=u[0],k=x.substring(u.index),T=st(y,u,k);if(!T)return Et;const M=y;y.endScope&&y.endScope._wrap?(B(),G(b,y.endScope._wrap)):y.endScope&&y.endScope._multi?(B(),nt(y.endScope,u)):M.skip?A+=b:(M.returnEnd||M.excludeEnd||(A+=b),B(),M.excludeEnd&&(A=b));do y.scope&&U.closeNode(),!y.skip&&!y.subLanguage&&(Ae+=y.relevance),y=y.parent;while(y!==T.parent);return T.starts&&it(T.starts,u),M.returnEnd?0:b.length}function kr(){const u=[];for(let b=y;b!==j;b=b.parent)b.scope&&u.unshift(b.scope);u.forEach(b=>U.openNode(b))}let Te={};function ot(u,b){const k=b&&b[0];if(A+=u,k==null)return B(),0;if(Te.type==="begin"&&b.type==="end"&&Te.index===b.index&&k===""){if(A+=x.slice(b.index,b.index+1),!s){const T=new Error(`0 width match regex (${c})`);throw T.languageName=c,T.badRule=Te.rule,T}return 1}if(Te=b,b.type==="begin")return yr(b);if(b.type==="illegal"&&!g){const T=new Error('Illegal lexeme "'+k+'" for mode "'+(y.scope||"<unnamed>")+'"');throw T.mode=y,T}else if(b.type==="end"){const T=fr(b);if(T!==Et)return T}if(b.type==="illegal"&&k==="")return A+=`
`,1;if($e>1e5&&$e>b.index*3)throw new Error("potential infinite loop, way more iterations than matches");return A+=k,k.length}const j=I(c);if(!j)throw Q(o.replace("{}",c)),new Error('Unknown language: "'+c+'"');const vr=An(j);let Fe="",y=f||vr;const lt={},U=new d.__emitter(d);kr();let A="",Ae=0,X=0,$e=0,He=!1;try{if(j.__emitTokens)j.__emitTokens(x,U);else{for(y.matcher.considerAll();;){$e++,He?He=!1:y.matcher.considerAll(),y.matcher.lastIndex=X;const u=y.matcher.exec(x);if(!u)break;const b=x.substring(X,u.index),k=ot(b,u);X=u.index+k}ot(x.substring(X))}return U.finalize(),Fe=U.toHTML(),{language:c,value:Fe,relevance:Ae,illegal:!1,_emitter:U,_top:y}}catch(u){if(u.message&&u.message.includes("Illegal"))return{language:c,value:We(x),illegal:!0,relevance:0,_illegalBy:{message:u.message,index:X,context:x.slice(X-100,X+100),mode:u.mode,resultSoFar:Fe},_emitter:U};if(s)return{language:c,value:We(x),illegal:!1,relevance:0,errorRaised:u,_emitter:U,_top:y};throw u}}function E(c){const x={value:We(c),illegal:!1,relevance:0,_top:l,_emitter:new d.__emitter(d)};return x._emitter.addText(c),x}function S(c,x){x=x||d.languages||Object.keys(r);const g=E(c),f=x.filter(I).filter(ae).map(B=>C(B,c,!1));f.unshift(g);const w=f.sort((B,G)=>{if(B.relevance!==G.relevance)return G.relevance-B.relevance;if(B.language&&G.language){if(I(B.language).supersetOf===G.language)return 1;if(I(G.language).supersetOf===B.language)return-1}return 0}),[R,_]=w,W=R;return W.secondBest=_,W}function P(c,x,g){const f=x&&a[x]||g;c.classList.add("hljs"),c.classList.add(`language-${f}`)}function N(c){let x=null;const g=h(c);if(m(g))return;if(q("before:highlightElement",{el:c,language:g}),c.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",c);return}if(c.children.length>0&&(d.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(c)),d.throwUnescapedHTML))throw new Rn("One of your code blocks includes unescaped HTML.",c.innerHTML);x=c;const f=x.textContent,w=g?v(f,{language:g,ignoreIllegals:!0}):S(f);c.innerHTML=w.value,c.dataset.highlighted="yes",P(c,g,w.language),c.result={language:w.language,re:w.relevance,relevance:w.relevance},w.secondBest&&(c.secondBest={language:w.secondBest.language,relevance:w.secondBest.relevance}),q("after:highlightElement",{el:c,result:w,text:f})}function $(c){d=wt(d,c)}const J=()=>{F(),ne("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function O(){F(),ne("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let z=!1;function F(){function c(){F()}if(document.readyState==="loading"){z||window.addEventListener("DOMContentLoaded",c,!1),z=!0;return}document.querySelectorAll(d.cssSelector).forEach(N)}function H(c,x){let g=null;try{g=x(t)}catch(f){if(Q("Language definition for '{}' could not be registered.".replace("{}",c)),s)Q(f);else throw f;g=l}g.name||(g.name=c),r[c]=g,g.rawDefinition=x.bind(null,t),g.aliases&&re(g.aliases,{languageName:c})}function D(c){delete r[c];for(const x of Object.keys(a))a[x]===c&&delete a[x]}function me(){return Object.keys(r)}function I(c){return c=(c||"").toLowerCase(),r[c]||r[a[c]]}function re(c,{languageName:x}){typeof c=="string"&&(c=[c]),c.forEach(g=>{a[g.toLowerCase()]=x})}function ae(c){const x=I(c);return x&&!x.disableAutodetect}function pe(c){c["before:highlightBlock"]&&!c["before:highlightElement"]&&(c["before:highlightElement"]=x=>{c["before:highlightBlock"](Object.assign({block:x.el},x))}),c["after:highlightBlock"]&&!c["after:highlightElement"]&&(c["after:highlightElement"]=x=>{c["after:highlightBlock"](Object.assign({block:x.el},x))})}function ue(c){pe(c),i.push(c)}function ge(c){const x=i.indexOf(c);x!==-1&&i.splice(x,1)}function q(c,x){const g=c;i.forEach(function(f){f[g]&&f[g](x)})}function xe(c){return ne("10.7.0","highlightBlock will be removed entirely in v12.0"),ne("10.7.0","Please use highlightElement now."),N(c)}Object.assign(t,{highlight:v,highlightAuto:S,highlightAll:F,highlightElement:N,highlightBlock:xe,configure:$,initHighlighting:J,initHighlightingOnLoad:O,registerLanguage:H,unregisterLanguage:D,listLanguages:me,getLanguage:I,registerAliases:re,autoDetection:ae,inherit:wt,addPlugin:ue,removePlugin:ge}),t.debugMode=function(){s=!1},t.safeMode=function(){s=!0},t.versionString=Sn,t.regex={concat:te,lookahead:Zt,either:tt,optional:Ha,anyNumberOfTimes:$a};for(const c in Se)typeof Se[c]=="object"&&Kt(Se[c]);return Object.assign(t,Se),t},le=nr({});le.newInstance=()=>nr({});var Pn=le;le.HighlightJS=le;le.default=le;const ee=Da(Pn),Ne="[A-Za-z$_][0-9A-Za-z$_]*",ir=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],sr=["true","false","null","undefined","NaN","Infinity"],or=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],lr=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],dr=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],cr=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],mr=[].concat(dr,or,lr);function Un(t){const r=t.regex,a=(g,{after:f})=>{const w="</"+g[0].slice(1);return g.input.indexOf(w,f)!==-1},i=Ne,s={begin:"<>",end:"</>"},o=/<[A-Za-z0-9\\._:-]+\s*\/>/,l={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(g,f)=>{const w=g[0].length+g.index,R=g.input[w];if(R==="<"||R===","){f.ignoreMatch();return}R===">"&&(a(g,{after:w})||f.ignoreMatch());let _;const W=g.input.substring(w);if(_=W.match(/^\s*=/)){f.ignoreMatch();return}if((_=W.match(/^\s+extends\s+/))&&_.index===0){f.ignoreMatch();return}}},d={$pattern:Ne,keyword:ir,literal:sr,built_in:mr,"variable.language":cr},m="[0-9](_?[0-9])*",h=`\\.(${m})`,v="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",C={className:"number",variants:[{begin:`(\\b(${v})((${h})|\\.)?|(${h}))[eE][+-]?(${m})\\b`},{begin:`\\b(${v})\\b((${h})\\b|\\.)?|(${h})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},E={className:"subst",begin:"\\$\\{",end:"\\}",keywords:d,contains:[]},S={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,E],subLanguage:"xml"}},P={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,E],subLanguage:"css"}},N={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,E],subLanguage:"graphql"}},$={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,E]},O={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:i+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},z=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,S,P,N,$,{match:/\$\d+/},C];E.contains=z.concat({begin:/\{/,end:/\}/,keywords:d,contains:["self"].concat(z)});const F=[].concat(O,E.contains),H=F.concat([{begin:/(\s*)\(/,end:/\)/,keywords:d,contains:["self"].concat(F)}]),D={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:d,contains:H},me={variants:[{match:[/class/,/\s+/,i,/\s+/,/extends/,/\s+/,r.concat(i,"(",r.concat(/\./,i),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,i],scope:{1:"keyword",3:"title.class"}}]},I={relevance:0,match:r.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...or,...lr]}},re={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},ae={variants:[{match:[/function/,/\s+/,i,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[D],illegal:/%/},pe={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function ue(g){return r.concat("(?!",g.join("|"),")")}const ge={match:r.concat(/\b/,ue([...dr,"super","import"].map(g=>`${g}\\s*\\(`)),i,r.lookahead(/\s*\(/)),className:"title.function",relevance:0},q={begin:r.concat(/\./,r.lookahead(r.concat(i,/(?![0-9A-Za-z$_(])/))),end:i,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},xe={match:[/get|set/,/\s+/,i,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},D]},c="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",x={match:[/const|var|let/,/\s+/,i,/\s*/,/=\s*/,/(async\s*)?/,r.lookahead(c)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[D]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:d,exports:{PARAMS_CONTAINS:H,CLASS_REFERENCE:I},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),re,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,S,P,N,$,O,{match:/\$\d+/},C,I,{scope:"attr",match:i+r.lookahead(":"),relevance:0},x,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[O,t.REGEXP_MODE,{className:"function",begin:c,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:d,contains:H}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:s.begin,end:s.end},{match:o},{begin:l.begin,"on:begin":l.isTrulyOpeningTag,end:l.end}],subLanguage:"xml",contains:[{begin:l.begin,end:l.end,skip:!0,contains:["self"]}]}]},ae,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[D,t.inherit(t.TITLE_MODE,{begin:i,className:"title.function"})]},{match:/\.\.\./,relevance:0},q,{match:"\\$"+i,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[D]},ge,pe,me,xe,{match:/\$[(.]/}]}}function pr(t){const r=t.regex,a=Un(t),i=Ne,s=["any","void","number","boolean","string","object","never","symbol","bigint","unknown"],o={begin:[/namespace/,/\s+/,t.IDENT_RE],beginScope:{1:"keyword",3:"title.class"}},l={beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:s},contains:[a.exports.CLASS_REFERENCE]},d={className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/},m=["type","interface","public","private","protected","implements","declare","abstract","readonly","enum","override","satisfies"],h={$pattern:Ne,keyword:ir.concat(m),literal:sr,built_in:mr.concat(s),"variable.language":cr},v={className:"meta",begin:"@"+i},C=(N,$,J)=>{const O=N.contains.findIndex(z=>z.label===$);if(O===-1)throw new Error("can not find mode to replace");N.contains.splice(O,1,J)};Object.assign(a.keywords,h),a.exports.PARAMS_CONTAINS.push(v);const E=a.contains.find(N=>N.scope==="attr"),S=Object.assign({},E,{match:r.concat(i,r.lookahead(/\s*\?:/))});a.exports.PARAMS_CONTAINS.push([a.exports.CLASS_REFERENCE,E,S]),a.contains=a.contains.concat([v,o,l,S]),C(a,"shebang",t.SHEBANG()),C(a,"use_strict",d);const P=a.contains.find(N=>N.label==="func.def");return P.relevance=0,Object.assign(a,{name:"TypeScript",aliases:["ts","tsx","mts","cts"]}),a}const Tt="[A-Za-z$_][0-9A-Za-z$_]*",_n=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],Mn=["true","false","null","undefined","NaN","Infinity"],ur=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],gr=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],xr=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],On=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],In=[].concat(xr,ur,gr);function br(t){const r=t.regex,a=(g,{after:f})=>{const w="</"+g[0].slice(1);return g.input.indexOf(w,f)!==-1},i=Tt,s={begin:"<>",end:"</>"},o=/<[A-Za-z0-9\\._:-]+\s*\/>/,l={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(g,f)=>{const w=g[0].length+g.index,R=g.input[w];if(R==="<"||R===","){f.ignoreMatch();return}R===">"&&(a(g,{after:w})||f.ignoreMatch());let _;const W=g.input.substring(w);if(_=W.match(/^\s*=/)){f.ignoreMatch();return}if((_=W.match(/^\s+extends\s+/))&&_.index===0){f.ignoreMatch();return}}},d={$pattern:Tt,keyword:_n,literal:Mn,built_in:In,"variable.language":On},m="[0-9](_?[0-9])*",h=`\\.(${m})`,v="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",C={className:"number",variants:[{begin:`(\\b(${v})((${h})|\\.)?|(${h}))[eE][+-]?(${m})\\b`},{begin:`\\b(${v})\\b((${h})\\b|\\.)?|(${h})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},E={className:"subst",begin:"\\$\\{",end:"\\}",keywords:d,contains:[]},S={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,E],subLanguage:"xml"}},P={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,E],subLanguage:"css"}},N={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,E],subLanguage:"graphql"}},$={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,E]},O={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:i+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},z=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,S,P,N,$,{match:/\$\d+/},C];E.contains=z.concat({begin:/\{/,end:/\}/,keywords:d,contains:["self"].concat(z)});const F=[].concat(O,E.contains),H=F.concat([{begin:/(\s*)\(/,end:/\)/,keywords:d,contains:["self"].concat(F)}]),D={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:d,contains:H},me={variants:[{match:[/class/,/\s+/,i,/\s+/,/extends/,/\s+/,r.concat(i,"(",r.concat(/\./,i),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,i],scope:{1:"keyword",3:"title.class"}}]},I={relevance:0,match:r.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...ur,...gr]}},re={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},ae={variants:[{match:[/function/,/\s+/,i,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[D],illegal:/%/},pe={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function ue(g){return r.concat("(?!",g.join("|"),")")}const ge={match:r.concat(/\b/,ue([...xr,"super","import"].map(g=>`${g}\\s*\\(`)),i,r.lookahead(/\s*\(/)),className:"title.function",relevance:0},q={begin:r.concat(/\./,r.lookahead(r.concat(i,/(?![0-9A-Za-z$_(])/))),end:i,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},xe={match:[/get|set/,/\s+/,i,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},D]},c="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",x={match:[/const|var|let/,/\s+/,i,/\s*/,/=\s*/,/(async\s*)?/,r.lookahead(c)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[D]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:d,exports:{PARAMS_CONTAINS:H,CLASS_REFERENCE:I},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),re,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,S,P,N,$,O,{match:/\$\d+/},C,I,{scope:"attr",match:i+r.lookahead(":"),relevance:0},x,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[O,t.REGEXP_MODE,{className:"function",begin:c,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:d,contains:H}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:s.begin,end:s.end},{match:o},{begin:l.begin,"on:begin":l.isTrulyOpeningTag,end:l.end}],subLanguage:"xml",contains:[{begin:l.begin,end:l.end,skip:!0,contains:["self"]}]}]},ae,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[D,t.inherit(t.TITLE_MODE,{begin:i,className:"title.function"})]},{match:/\.\.\./,relevance:0},q,{match:"\\$"+i,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[D]},ge,pe,me,xe,{match:/\$[(.]/}]}}function Dn(t){const r=t.regex,a={},i={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[a]}]};Object.assign(a,{className:"variable",variants:[{begin:r.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},i]});const s={className:"subst",begin:/\$\(/,end:/\)/,contains:[t.BACKSLASH_ESCAPE]},o=t.inherit(t.COMMENT(),{match:[/(^|\s)/,/#.*$/],scope:{2:"comment"}}),l={begin:/<<-?\s*(?=\w+)/,starts:{contains:[t.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},d={className:"string",begin:/"/,end:/"/,contains:[t.BACKSLASH_ESCAPE,a,s]};s.contains.push(d);const m={match:/\\"/},h={className:"string",begin:/'/,end:/'/},v={match:/\\'/},C={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},t.NUMBER_MODE,a]},E=["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"],S=t.SHEBANG({binary:`(${E.join("|")})`,relevance:10}),P={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[t.inherit(t.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0},N=["if","then","else","elif","fi","time","for","while","until","in","do","done","case","esac","coproc","function","select"],$=["true","false"],J={match:/(\/[a-z._-]+)+/},O=["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset"],z=["alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","sudo","type","typeset","ulimit","unalias"],F=["autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp"],H=["chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"];return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:N,literal:$,built_in:[...O,...z,"set","shopt",...F,...H]},contains:[S,t.SHEBANG(),P,C,o,l,J,d,m,h,v,a]}}ee.registerLanguage("typescript",pr);ee.registerLanguage("tsx",pr);ee.registerLanguage("javascript",br);ee.registerLanguage("js",br);ee.registerLanguage("bash",Dn);const n=ha(()=>{const t=Ca(null);return zr(()=>{var s;if(!t.value)return;const r=((s=t.value.className.match(/language-(\w+)/))==null?void 0:s[1])||"typescript";if(r==="bash"){ee.highlightElement(t.value),t.value.innerHTML&&(t.value.innerHTML=t.value.innerHTML.replace(/^(\s*)\$(\s)/gm,'$1<span class="bash-prompt">$</span>$2'));return}const a=t.value.textContent||"",i=ee.highlight(a,{language:r}).value;t.value.innerHTML=i}),({code:r,language:a})=>e("pre",{class:"code-block bg-gray-100 dark:bg-[#1e1e1e] p-6 rounded-lg overflow-x-auto mb-6 text-xs md:text-sm border border-gray-200 dark:border-gray-800",children:e("code",{ref:t,class:`language-${a||"typescript"}`,children:r})})}),Bn=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"pipe"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Compose functions from left to right (f → g → h)"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is pipe?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded",children:"pipe"})," ","is a function that composes multiple functions from left to right.",e("br",{}),e("br",{}),"It takes the output of one function and passes it as the input to the next function, creating a readable data transformation pipeline.",e("br",{}),e("br",{}),"This is the most natural way to read transformations: start with data, then apply transformations in order."]}),e(n,{language:"typescript",code:`import { pipe } from 'fp-kit';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;
const toString = (n: number) => String(n);

const transform = pipe(
  double,    // 1. First, double the number
  addTen,    // 2. Then, add 10
  toString   // 3. Finally, convert to string
);

transform(5);  // "20"
// Flow: 5 → double → 10 → addTen → 20 → toString → "20"`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Type Signature"}),e(n,{language:"typescript",code:`function pipe<A, R>(ab: (a: A) => R): (a: A) => R;
function pipe<A, B, R>(
  ab: (a: A) => B,
  bc: (b: B) => R
): (a: A) => R;
function pipe<A, B, C, R>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => R
): (a: A) => R;
// ... up to 5 functions

function pipe(...funcs: Array<(input: any) => any>): (input: any) => any;`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"The type signature ensures type safety across the pipeline. Each function's output type must match the next function's input type."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Basic Usage"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Simple Data Transformation"}),e(n,{language:"typescript",code:`import { pipe } from 'fp-kit';

const processName = pipe(
  (name: string) => name.trim(),
  (name: string) => name.toLowerCase(),
  (name: string) => name.split(' '),
  (parts: string[]) => parts.join('-')
);

processName('  John Doe  ');  // "john-doe"`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Working with Arrays"}),e(n,{language:"typescript",code:`import { pipe } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5];

const processNumbers = pipe(
  (nums: number[]) => nums.filter(n => n > 2),
  (nums: number[]) => nums.map(n => n * 2),
  (nums: number[]) => nums.reduce((sum, n) => sum + n, 0)
);

processNumbers(numbers);  // 24
// Flow: [1,2,3,4,5] → filter → [3,4,5] → map → [6,8,10] → reduce → 24`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Practical Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"User Data Processing"}),e(n,{language:"typescript",code:`import { pipe } from 'fp-kit';

interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

const getActiveAdultNames = pipe(
  (users: User[]) => users.filter(u => u.active),
  (users: User[]) => users.filter(u => u.age >= 18),
  (users: User[]) => users.map(u => u.name),
  (names: string[]) => names.sort()
);

const users: User[] = [
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 17, active: true },
  { id: 3, name: 'Charlie', age: 30, active: false },
  { id: 4, name: 'Diana', age: 22, active: true },
];

getActiveAdultNames(users);  // ["Alice", "Diana"]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Price Calculation Pipeline"}),e(n,{language:"typescript",code:`import { pipe } from 'fp-kit';

const calculateFinalPrice = pipe(
  (price: number) => price * 0.9,        // 10% discount
  (price: number) => price * 1.1,        // Add 10% tax
  (price: number) => Math.round(price * 100) / 100,  // Round to 2 decimals
  (price: number) => \`$\${price.toFixed(2)}\`  // Format as currency
);

calculateFinalPrice(100);  // "$99.00"`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"URL Slug Generation"}),e(n,{language:"typescript",code:`import { pipe } from 'fp-kit';

const createSlug = pipe(
  (title: string) => title.toLowerCase(),
  (str: string) => str.replace(/[^a-z0-9\\s-]/g, ''),
  (str: string) => str.trim(),
  (str: string) => str.replace(/\\s+/g, '-'),
  (str: string) => str.replace(/-+/g, '-')
);

createSlug('Hello World! This is a Test.');  // "hello-world-this-is-a-test"
createSlug('  Multiple   Spaces  ');         // "multiple-spaces"`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Data Validation and Transformation"}),e(n,{language:"typescript",code:`import { pipe } from 'fp-kit';

interface RawInput {
  email?: string;
  age?: string;
}

interface ValidatedUser {
  email: string;
  age: number;
}

const validateAndTransform = pipe(
  (input: RawInput) => {
    if (!input.email || !input.age) {
      throw new Error('Missing required fields');
    }
    return input as Required<RawInput>;
  },
  (input: Required<RawInput>) => ({
    email: input.email.toLowerCase().trim(),
    age: parseInt(input.age, 10),
  }),
  (user: ValidatedUser) => {
    if (user.age < 0 || user.age > 150) {
      throw new Error('Invalid age');
    }
    return user;
  }
);

validateAndTransform({ email: '  TEST@EXAMPLE.COM  ', age: '25' });
// { email: 'test@example.com', age: 25 }`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Combining with Other Utilities"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"pipe works great with other fp-kit utilities like curry for maximum composability:"}),e(n,{language:"typescript",code:`import { pipe, curry } from 'fp-kit';

// Create curried helper functions
const multiply = curry((a: number, b: number) => a * b);
const add = curry((a: number, b: number) => a + b);
const divide = curry((a: number, b: number) => a / b);

// Compose them in a pipeline
const calculate = pipe(
  multiply(2),      // Double it
  add(10),          // Add 10
  divide(4)         // Divide by 4
);

calculate(5);  // 5
// Flow: 5 → *2 → 10 → +10 → 20 → /4 → 5`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"pipe vs compose"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"Both pipe and compose create function compositions, but they flow in opposite directions:"}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",children:[e("div",{class:"border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg",children:[e("h4",{class:"text-lg font-medium text-blue-900 dark:text-blue-100 mb-2",children:"pipe (left to right)"}),e(n,{language:"typescript",code:`pipe(
  double,
  addTen,
  toString
)(5)
// 5 → 10 → 20 → "20"`})]}),e("div",{class:"border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg",children:[e("h4",{class:"text-lg font-medium text-purple-900 dark:text-purple-100 mb-2",children:"compose (right to left)"}),e(n,{language:"typescript",code:`compose(
  toString,
  addTen,
  double
)(5)
// 5 → 10 → 20 → "20"`})]})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded-r",children:e("p",{class:"text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed",children:[e("span",{class:"font-medium",children:"💡 When to use pipe:"}),e("br",{}),e("br",{}),"Use ",e("strong",{children:"pipe"})," when you want to read transformations in the order they execute. This is more intuitive for most developers and reads like a step-by-step recipe.",e("br",{}),e("br",{}),"Use ",e("strong",{children:"compose"})," when you prefer the mathematical notation or when working with code that follows that convention."]})}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Implementation Details"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"Under the hood, pipe uses Array.reduce to apply functions from left to right:"}),e(n,{language:"typescript",code:`function pipe(...funcs: Array<(input: any) => any>) {
  return (init: any) => funcs.reduce((acc, item) => item(acc), init);
}`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/compose",onClick:t=>{t.preventDefault(),p("/composition/compose")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"compose →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Learn about compose, which composes functions from right to left."})]}),e("a",{href:"/composition/curry",onClick:t=>{t.preventDefault(),p("/composition/curry")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-pink-600 dark:text-pink-400 mb-2",children:"curry →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Learn about curry to create partially applied functions for better composition."})]})]})]}),Ln=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"pipe"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"왼쪽에서 오른쪽으로 함수를 합성 (f → g → h)"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"pipe란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded",children:"pipe"})," ","는 여러 함수를 왼쪽에서 오른쪽으로 합성하는 함수입니다.",e("br",{}),e("br",{}),"한 함수의 출력을 다음 함수의 입력으로 전달하여 가독성 있는 데이터 변환 파이프라인을 만듭니다.",e("br",{}),e("br",{}),"변환을 읽는 가장 자연스러운 방법입니다: 데이터로 시작한 다음 변환을 순서대로 적용합니다."]}),e(n,{language:"typescript",code:`import { pipe } from 'fp-kit';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;
const toString = (n: number) => String(n);

const transform = pipe(
  double,    // 1. 먼저 숫자를 2배로
  addTen,    // 2. 그 다음 10을 더하고
  toString   // 3. 마지막으로 문자열로 변환
);

transform(5);  // "20"
// 흐름: 5 → double → 10 → addTen → 20 → toString → "20"`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"기본 사용법"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"간단한 데이터 변환"}),e(n,{language:"typescript",code:`import { pipe } from 'fp-kit';

const processName = pipe(
  (name: string) => name.trim(),
  (name: string) => name.toLowerCase(),
  (name: string) => name.split(' '),
  (parts: string[]) => parts.join('-')
);

processName('  John Doe  ');  // "john-doe"`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"배열 다루기"}),e(n,{language:"typescript",code:`import { pipe } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5];

const processNumbers = pipe(
  (nums: number[]) => nums.filter(n => n > 2),
  (nums: number[]) => nums.map(n => n * 2),
  (nums: number[]) => nums.reduce((sum, n) => sum + n, 0)
);

processNumbers(numbers);  // 24
// 흐름: [1,2,3,4,5] → filter → [3,4,5] → map → [6,8,10] → reduce → 24`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예제"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"사용자 데이터 처리"}),e(n,{language:"typescript",code:`import { pipe } from 'fp-kit';

interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

const getActiveAdultNames = pipe(
  (users: User[]) => users.filter(u => u.active),
  (users: User[]) => users.filter(u => u.age >= 18),
  (users: User[]) => users.map(u => u.name),
  (names: string[]) => names.sort()
);

const users: User[] = [
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 17, active: true },
  { id: 3, name: 'Charlie', age: 30, active: false },
  { id: 4, name: 'Diana', age: 22, active: true },
];

getActiveAdultNames(users);  // ["Alice", "Diana"]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"가격 계산 파이프라인"}),e(n,{language:"typescript",code:`import { pipe } from 'fp-kit';

const calculateFinalPrice = pipe(
  (price: number) => price * 0.9,        // 10% 할인
  (price: number) => price * 1.1,        // 10% 세금 추가
  (price: number) => Math.round(price * 100) / 100,  // 소수점 2자리로
  (price: number) => \`₩\${price.toFixed(2)}\`  // 통화 형식으로
);

calculateFinalPrice(100);  // "₩99.00"`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다른 유틸리티와 결합"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"pipe는 curry 같은 다른 fp-kit 유틸리티와 함께 사용하면 최대한의 조합 가능성을 제공합니다:"}),e(n,{language:"typescript",code:`import { pipe, curry } from 'fp-kit';

// 커리된 헬퍼 함수 생성
const multiply = curry((a: number, b: number) => a * b);
const add = curry((a: number, b: number) => a + b);
const divide = curry((a: number, b: number) => a / b);

// 파이프라인에서 조합
const calculate = pipe(
  multiply(2),      // 2배로
  add(10),          // 10 더하기
  divide(4)         // 4로 나누기
);

calculate(5);  // 5
// 흐름: 5 → *2 → 10 → +10 → 20 → /4 → 5`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"pipe vs compose"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"pipe와 compose 모두 함수 합성을 만들지만, 반대 방향으로 흐릅니다:"}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",children:[e("div",{class:"border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg",children:[e("h4",{class:"text-lg font-medium text-blue-900 dark:text-blue-100 mb-2",children:"pipe (왼쪽에서 오른쪽)"}),e(n,{language:"typescript",code:`pipe(
  double,
  addTen,
  toString
)(5)
// 5 → 10 → 20 → "20"`})]}),e("div",{class:"border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg",children:[e("h4",{class:"text-lg font-medium text-purple-900 dark:text-purple-100 mb-2",children:"compose (오른쪽에서 왼쪽)"}),e(n,{language:"typescript",code:`compose(
  toString,
  addTen,
  double
)(5)
// 5 → 10 → 20 → "20"`})]})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded-r",children:e("p",{class:"text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed",children:[e("span",{class:"font-medium",children:"💡 pipe를 사용해야 할 때:"}),e("br",{}),e("br",{}),"변환이 실행되는 순서대로 읽고 싶을 때 ",e("strong",{children:"pipe"}),"를 사용하세요. 이것이 대부분의 개발자에게 더 직관적이며 단계별 레시피처럼 읽힙니다.",e("br",{}),e("br",{}),"수학적 표기법을 선호하거나 그 규칙을 따르는 코드로 작업할 때는",e("strong",{children:"compose"}),"를 사용하세요."]})}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/compose",onClick:t=>{t.preventDefault(),p("/composition/compose")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"compose →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"오른쪽에서 왼쪽으로 함수를 합성하는 compose에 대해 알아보세요."})]}),e("a",{href:"/composition/curry",onClick:t=>{t.preventDefault(),p("/composition/curry")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-pink-600 dark:text-pink-400 mb-2",children:"curry →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"더 나은 합성을 위해 부분 적용된 함수를 만드는 curry에 대해 알아보세요."})]})]})]}),zn=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"compose"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Compose functions from right to left (h ← g ← f)"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is compose?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded",children:"compose"})," ","is a function that composes multiple functions from right to left.",e("br",{}),e("br",{}),"It follows the traditional mathematical notation: f(g(h(x))) becomes compose(f, g, h)(x).",e("br",{}),e("br",{}),"This is the classical functional programming approach where the last function in the list is applied first."]}),e(n,{language:"typescript",code:`import { compose } from 'fp-kit';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;
const toString = (n: number) => String(n);

const transform = compose(
  toString,  // 3. Finally, convert to string
  addTen,    // 2. Then, add 10
  double     // 1. First, double the number
);

transform(5);  // "20"
// Flow: 5 ← double ← 10 ← addTen ← 20 ← toString ← "20"
// Same as: toString(addTen(double(5)))`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Type Signature"}),e(n,{language:"typescript",code:`function compose<A, R>(ab: (a: A) => R): (a: A) => R;
function compose<A, B, R>(
  ab: (a: A) => B,
  bc: (b: B) => R
): (a: A) => R;
function compose<A, B, C, R>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => R
): (a: A) => R;
// ... up to 5 functions

function compose(...funcs: Array<(input: any) => any>): (input: any) => any;`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Basic Usage"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Mathematical Style"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"compose reads like mathematical function composition. The rightmost function is applied first:"}),e(n,{language:"typescript",code:`import { compose } from 'fp-kit';

// Mathematical notation: f(g(h(x)))
const h = (x: number) => x + 1;
const g = (x: number) => x * 2;
const f = (x: number) => x - 3;

const fgh = compose(f, g, h);

fgh(5);  // 9
// Step by step:
// 1. h(5) = 6
// 2. g(6) = 12
// 3. f(12) = 9`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"String Processing"}),e(n,{language:"typescript",code:`import { compose } from 'fp-kit';

const addExclamation = (s: string) => s + '!';
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const trim = (s: string) => s.trim();

const formatGreeting = compose(
  addExclamation,
  capitalize,
  trim
);

formatGreeting('  hello world  ');  // "Hello world!"`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Practical Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Data Extraction Pipeline"}),e(n,{language:"typescript",code:`import { compose } from 'fp-kit';

interface User {
  profile: {
    name: string;
    age: number;
  };
  settings: {
    notifications: boolean;
  };
}

const getAge = (user: User) => user.profile.age;
const isAdult = (age: number) => age >= 18;
const toYesNo = (bool: boolean) => bool ? 'Yes' : 'No';

const checkAdultStatus = compose(
  toYesNo,
  isAdult,
  getAge
);

const user: User = {
  profile: { name: 'Alice', age: 25 },
  settings: { notifications: true }
};

checkAdultStatus(user);  // "Yes"`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Number Validation"}),e(n,{language:"typescript",code:`import { compose } from 'fp-kit';

const parseNum = (str: string) => parseInt(str, 10);
const isPositive = (n: number) => n > 0;
const isEven = (n: number) => n % 2 === 0;
const both = (a: boolean) => (b: boolean) => a && b;

const isValidEvenPositive = (str: string) => {
  const num = parseNum(str);
  return both(isPositive(num))(isEven(num));
};

isValidEvenPositive('42');   // true
isValidEvenPositive('41');   // false
isValidEvenPositive('-42');  // false`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Higher-Order Function Composition"}),e(n,{language:"typescript",code:`import { compose } from 'fp-kit';

// Higher-order functions
const map = <T, U>(fn: (x: T) => U) => (arr: T[]) => arr.map(fn);
const filter = <T>(pred: (x: T) => boolean) => (arr: T[]) => arr.filter(pred);
const reduce = <T, R>(fn: (acc: R, x: T) => R, init: R) => (arr: T[]) => arr.reduce(fn, init);

const sumSquaresOfEvens = compose(
  reduce((sum: number, n: number) => sum + n, 0),
  map((n: number) => n * n),
  filter((n: number) => n % 2 === 0)
);

sumSquaresOfEvens([1, 2, 3, 4, 5, 6]);  // 56
// [1,2,3,4,5,6] → filter evens → [2,4,6] → square → [4,16,36] → sum → 56`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"compose vs pipe"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"The only difference between compose and pipe is the direction of function application:"}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",children:[e("div",{class:"border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg",children:[e("h4",{class:"text-lg font-medium text-purple-900 dark:text-purple-100 mb-2",children:"compose (right to left)"}),e(n,{language:"typescript",code:`compose(
  toString,  // 3rd
  addTen,    // 2nd
  double     // 1st
)(5)
// Reads like: f(g(h(x)))`}),e("p",{class:"text-sm text-purple-700 dark:text-purple-300 mt-2",children:"Traditional mathematical notation"})]}),e("div",{class:"border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg",children:[e("h4",{class:"text-lg font-medium text-blue-900 dark:text-blue-100 mb-2",children:"pipe (left to right)"}),e(n,{language:"typescript",code:`pipe(
  double,    // 1st
  addTen,    // 2nd
  toString   // 3rd
)(5)
// Reads like a recipe`}),e("p",{class:"text-sm text-blue-700 dark:text-blue-300 mt-2",children:"More intuitive execution order"})]})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 mb-6 rounded-r",children:e("p",{class:"text-sm md:text-base text-purple-800 dark:text-purple-200 leading-relaxed",children:[e("span",{class:"font-medium",children:"💡 When to use compose:"}),e("br",{}),e("br",{}),"Use ",e("strong",{children:"compose"})," when:",e("br",{}),"• You're familiar with mathematical function composition",e("br",{}),"• Working with code that follows mathematical conventions",e("br",{}),'• You prefer thinking "from the outside in"',e("br",{}),e("br",{}),"Most developers find ",e("strong",{children:"pipe"})," more readable for day-to-day use."]})}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Implementation Details"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"Under the hood, compose uses Array.reduceRight to apply functions from right to left:"}),e(n,{language:"typescript",code:`function compose(...funcs: Array<(input: any) => any>) {
  return (value: any) => funcs.reduceRight((acc, fn) => fn(acc), value);
}`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:["The key difference from pipe is the use of ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"reduceRight"})," instead of ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"reduce"}),"."]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"pipe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Learn about pipe, the more intuitive left-to-right composition."})]}),e("a",{href:"/composition/curry",onClick:t=>{t.preventDefault(),p("/composition/curry")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-pink-600 dark:text-pink-400 mb-2",children:"curry →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Learn about curry to create partially applied functions for better composition."})]})]})]}),Fn=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"compose"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"오른쪽에서 왼쪽으로 함수를 합성 (h ← g ← f)"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"compose란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded",children:"compose"})," ","는 여러 함수를 오른쪽에서 왼쪽으로 합성하는 함수입니다.",e("br",{}),e("br",{}),"전통적인 수학적 표기법을 따릅니다: f(g(h(x)))는 compose(f, g, h)(x)가 됩니다.",e("br",{}),e("br",{}),"목록의 마지막 함수가 먼저 적용되는 고전적인 함수형 프로그래밍 접근 방식입니다."]}),e(n,{language:"typescript",code:`import { compose } from 'fp-kit';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;
const toString = (n: number) => String(n);

const transform = compose(
  toString,  // 3. 마지막으로 문자열로 변환
  addTen,    // 2. 그 다음 10을 더하고
  double     // 1. 먼저 숫자를 2배로
);

transform(5);  // "20"
// 흐름: 5 ← double ← 10 ← addTen ← 20 ← toString ← "20"
// 수학적 표기: toString(addTen(double(5)))`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"기본 사용법"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"수학적 스타일"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"compose는 수학적 함수 합성처럼 읽힙니다. 가장 오른쪽 함수가 먼저 적용됩니다:"}),e(n,{language:"typescript",code:`import { compose } from 'fp-kit';

// 수학적 표기: f(g(h(x)))
const h = (x: number) => x + 1;
const g = (x: number) => x * 2;
const f = (x: number) => x - 3;

const fgh = compose(f, g, h);

fgh(5);  // 9
// 단계별:
// 1. h(5) = 6
// 2. g(6) = 12
// 3. f(12) = 9`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예제"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"데이터 추출 파이프라인"}),e(n,{language:"typescript",code:`import { compose } from 'fp-kit';

interface User {
  profile: {
    name: string;
    age: number;
  };
  settings: {
    notifications: boolean;
  };
}

const getAge = (user: User) => user.profile.age;
const isAdult = (age: number) => age >= 18;
const toYesNo = (bool: boolean) => bool ? '예' : '아니오';

const checkAdultStatus = compose(
  toYesNo,
  isAdult,
  getAge
);

const user: User = {
  profile: { name: 'Alice', age: 25 },
  settings: { notifications: true }
};

checkAdultStatus(user);  // "예"`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"compose vs pipe"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"compose와 pipe의 유일한 차이점은 함수 적용 방향입니다:"}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",children:[e("div",{class:"border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg",children:[e("h4",{class:"text-lg font-medium text-purple-900 dark:text-purple-100 mb-2",children:"compose (오른쪽에서 왼쪽)"}),e(n,{language:"typescript",code:`compose(
  toString,  // 3번째
  addTen,    // 2번째
  double     // 1번째
)(5)
// 읽기: f(g(h(x)))`}),e("p",{class:"text-sm text-purple-700 dark:text-purple-300 mt-2",children:"전통적인 수학적 표기법"})]}),e("div",{class:"border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg",children:[e("h4",{class:"text-lg font-medium text-blue-900 dark:text-blue-100 mb-2",children:"pipe (왼쪽에서 오른쪽)"}),e(n,{language:"typescript",code:`pipe(
  double,    // 1번째
  addTen,    // 2번째
  toString   // 3번째
)(5)
// 읽기: 레시피처럼`}),e("p",{class:"text-sm text-blue-700 dark:text-blue-300 mt-2",children:"더 직관적인 실행 순서"})]})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 mb-6 rounded-r",children:e("p",{class:"text-sm md:text-base text-purple-800 dark:text-purple-200 leading-relaxed",children:[e("span",{class:"font-medium",children:"💡 compose를 사용해야 할 때:"}),e("br",{}),e("br",{}),"다음과 같은 경우 ",e("strong",{children:"compose"}),"를 사용하세요:",e("br",{}),"• 수학적 함수 합성에 익숙한 경우",e("br",{}),"• 수학적 규칙을 따르는 코드로 작업하는 경우",e("br",{}),'• "밖에서 안으로" 생각하는 것을 선호하는 경우',e("br",{}),e("br",{}),"대부분의 개발자는 일상적인 사용에서 ",e("strong",{children:"pipe"}),"가 더 읽기 쉽다고 생각합니다."]})}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"pipe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"더 직관적인 왼쪽에서 오른쪽 합성인 pipe에 대해 알아보세요."})]}),e("a",{href:"/composition/curry",onClick:t=>{t.preventDefault(),p("/composition/curry")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-pink-600 dark:text-pink-400 mb-2",children:"curry →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"더 나은 합성을 위해 부분 적용된 함수를 만드는 curry에 대해 알아보세요."})]})]})]}),$n=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"curry"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Transform functions to support partial application"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is curry?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"curry"})," ","transforms a multi-parameter function into a series of single-parameter functions.",e("br",{}),e("br",{}),"This enables ",e("strong",{children:"partial application"}),": you can supply arguments one at a time, and get back specialized functions.",e("br",{}),e("br",{}),"Curried functions are extremely composable and work perfectly with pipe and compose."]}),e(n,{language:"typescript",code:`import { curry } from 'fp-kit';

// Regular function
const add = (a: number, b: number) => a + b;
add(2, 3);  // 5

// Curried version
const curriedAdd = curry(add);
curriedAdd(2)(3);        // 5
curriedAdd(2, 3);        // 5 (also works!)

// Partial application
const add2 = curriedAdd(2);
add2(3);  // 5
add2(10); // 12`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Type Signature"}),e(n,{language:"typescript",code:`// Supports 2-5 parameter functions with full type inference
function curry<A, B, R>(fn: (a: A, b: B) => R): Curry2<A, B, R>;
function curry<A, B, C, R>(fn: (a: A, b: B, c: C) => R): Curry3<A, B, C, R>;
function curry<A, B, C, D, R>(fn: (a: A, b: B, c: C, d: D) => R): Curry4<A, B, C, D, R>;
function curry<A, B, C, D, E, R>(fn: (a: A, b: B, c: C, d: D, e: E) => R): Curry5<A, B, C, D, E, R>;

// Example: Curry2 type allows flexible calling
type Curry2<A, B, R> = {
  (a: A): (b: B) => R;      // Partial: one arg at a time
  (a: A, b: B): R;          // Full: all args at once
};`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"fp-kit's curry provides excellent TypeScript support with full type inference for functions with 2-5 parameters."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Basic Usage"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Simple Math Functions"}),e(n,{language:"typescript",code:`import { curry } from 'fp-kit';

const multiply = curry((a: number, b: number) => a * b);
const subtract = curry((a: number, b: number) => a - b);
const divide = curry((a: number, b: number) => a / b);

// Use them fully applied
multiply(3, 4);     // 12
subtract(10, 3);    // 7
divide(20, 4);      // 5

// Or partially applied
const double = multiply(2);
const triple = multiply(3);
const half = divide(2);

double(5);   // 10
triple(5);   // 15
half(10);    // 5`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"String Utilities"}),e(n,{language:"typescript",code:`import { curry } from 'fp-kit';

const replace = curry((search: string, replacement: string, text: string) =>
  text.replace(new RegExp(search, 'g'), replacement)
);

const split = curry((separator: string, text: string) =>
  text.split(separator)
);

const join = curry((separator: string, arr: string[]) =>
  arr.join(separator)
);

// Create specialized functions
const replaceSpaces = replace(' ', '-');
const splitByComma = split(',');
const joinWithPipe = join('|');

replaceSpaces('hello world');        // "hello-world"
splitByComma('a,b,c');               // ["a", "b", "c"]
joinWithPipe(['x', 'y', 'z']);       // "x|y|z"`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Practical Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Array Filtering and Mapping"}),e(n,{language:"typescript",code:`import { curry } from 'fp-kit';

const map = curry(<T, U>(fn: (x: T) => U, arr: T[]) => arr.map(fn));
const filter = curry(<T>(pred: (x: T) => boolean, arr: T[]) => arr.filter(pred));

const double = (n: number) => n * 2;
const isEven = (n: number) => n % 2 === 0;

// Create specialized functions
const doubleAll = map(double);
const filterEvens = filter(isEven);

const numbers = [1, 2, 3, 4, 5];

doubleAll(numbers);      // [2, 4, 6, 8, 10]
filterEvens(numbers);    // [2, 4]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Object Property Access"}),e(n,{language:"typescript",code:`import { curry } from 'fp-kit';

const prop = curry(<T, K extends keyof T>(key: K, obj: T) => obj[key]);

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// Create property extractors
const getName = prop('name');
const getEmail = prop('email');

users.map(getName);   // ["Alice", "Bob"]
users.map(getEmail);  // ["alice@example.com", "bob@example.com"]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Validation Functions"}),e(n,{language:"typescript",code:`import { curry } from 'fp-kit';

const hasMinLength = curry((min: number, str: string) => str.length >= min);
const hasMaxLength = curry((max: number, str: string) => str.length <= max);
const matches = curry((pattern: RegExp, str: string) => pattern.test(str));

// Create validators
const isValidUsername = hasMinLength(3);
const isValidPassword = hasMinLength(8);
const isEmail = matches(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/);

isValidUsername('ab');           // false
isValidUsername('alice');        // true
isValidPassword('pass');         // false
isValidPassword('password123');  // true
isEmail('test@example.com');     // true
isEmail('invalid');              // false`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Combining curry with pipe"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"curry shines when combined with pipe or compose. Partially applied curried functions create clean, reusable pipelines:"}),e(n,{language:"typescript",code:`import { pipe, curry } from 'fp-kit';

const add = curry((a: number, b: number) => a + b);
const multiply = curry((a: number, b: number) => a * b);
const subtract = curry((a: number, b: number) => a - b);

// Build a calculation pipeline
const calculate = pipe(
  add(10),        // Add 10
  multiply(2),    // Multiply by 2
  subtract(5)     // Subtract 5
);

calculate(5);   // 25
// Flow: 5 → +10 → 15 → *2 → 30 → -5 → 25`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Data Processing Pipeline"}),e(n,{language:"typescript",code:`import { pipe, curry } from 'fp-kit';

const filter = curry(<T>(pred: (x: T) => boolean, arr: T[]) => arr.filter(pred));
const map = curry(<T, U>(fn: (x: T) => U, arr: T[]) => arr.map(fn));
const reduce = curry(<T, R>(fn: (acc: R, x: T) => R, init: R, arr: T[]) =>
  arr.reduce(fn, init)
);

interface Product {
  name: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { name: 'Laptop', price: 1000, inStock: true },
  { name: 'Mouse', price: 25, inStock: false },
  { name: 'Keyboard', price: 75, inStock: true },
];

const getTotalPriceOfAvailableProducts = pipe(
  filter((p: Product) => p.inStock),
  map((p: Product) => p.price),
  reduce((sum: number, price: number) => sum + price, 0)
);

getTotalPriceOfAvailableProducts(products);  // 1075`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"URL Builder"}),e(n,{language:"typescript",code:`import { pipe, curry } from 'fp-kit';

const setProtocol = curry((protocol: string, url: string) =>
  \`\${protocol}://\${url}\`
);
const addPath = curry((path: string, url: string) =>
  \`\${url}/\${path}\`
);
const addQueryParam = curry((key: string, value: string, url: string) =>
  \`\${url}?\${key}=\${value}\`
);

const buildApiUrl = pipe(
  setProtocol('https'),
  addPath('api/v1'),
  addPath('users'),
  addQueryParam('page', '1')
);

buildApiUrl('example.com');
// "https://example.com/api/v1/users?page=1"`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Multiple Parameter Application"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"fp-kit's curry is flexible - you can provide multiple parameters at once:"}),e(n,{language:"typescript",code:`import { curry } from 'fp-kit';

const add3 = curry((a: number, b: number, c: number) => a + b + c);

// All equivalent:
add3(1)(2)(3);      // 6 - One at a time
add3(1, 2)(3);      // 6 - Two, then one
add3(1)(2, 3);      // 6 - One, then two
add3(1, 2, 3);      // 6 - All at once

// Partial application
const add1and2 = add3(1, 2);
add1and2(3);        // 6
add1and2(10);       // 13`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Why Curry?"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"1. Reusability"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200",children:"Create specialized versions of general functions. Instead of writing new functions, partially apply existing ones."})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"2. Composability"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200",children:"Curried functions work beautifully with pipe and compose. Partial application creates perfectly shaped functions for pipelines."})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"3. Configuration"}),e("p",{class:"text-sm text-blue-800 dark:text-blue-200",children:"Configure functions once with common parameters, then use the specialized version throughout your code."})]}),e("div",{class:"border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-green-900 dark:text-green-100 mb-2",children:"4. Readability"}),e("p",{class:"text-sm text-green-800 dark:text-green-200",children:"Named partially applied functions make code more self-documenting than inline parameters."})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Implementation Details"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"curry accumulates arguments until it has enough to call the original function:"}),e(n,{language:"typescript",code:`function curry(fn: (...args: any[]) => any, ...args: any[]): any {
  const curried = (accumulated: any[]) => {
    return accumulated.length >= fn.length
      ? fn(...accumulated)
      : (...nextArgs: any[]) => curried([...accumulated, ...nextArgs]);
  };

  return args.length === 0 ? curried([]) : curried(args);
}`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:["The implementation checks ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"fn.length"})," (the arity) to know when all parameters have been provided."]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"pipe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Combine your curried functions in readable pipelines with pipe."})]}),e("a",{href:"/composition/compose",onClick:t=>{t.preventDefault(),p("/composition/compose")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"compose →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Learn about mathematical-style function composition with compose."})]})]})]}),Hn=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"curry"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"부분 적용을 지원하도록 함수를 변환"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"curry란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"curry"})," ","는 다중 매개변수 함수를 일련의 단일 매개변수 함수로 변환합니다.",e("br",{}),e("br",{}),"이를 통해 ",e("strong",{children:"부분 적용"}),"이 가능합니다: 한 번에 하나씩 인수를 제공하고 특수화된 함수를 받을 수 있습니다.",e("br",{}),e("br",{}),"커리된 함수는 극도로 조합 가능하며 pipe 및 compose와 완벽하게 작동합니다."]}),e(n,{language:"typescript",code:`import { curry } from 'fp-kit';

// 일반 함수
const add = (a: number, b: number) => a + b;
add(2, 3);  // 5

// 커리된 버전
const curriedAdd = curry(add);
curriedAdd(2)(3);        // 5
curriedAdd(2, 3);        // 5 (이것도 작동합니다!)

// 부분 적용
const add2 = curriedAdd(2);
add2(3);  // 5
add2(10); // 12`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"기본 사용법"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"간단한 수학 함수"}),e(n,{language:"typescript",code:`import { curry } from 'fp-kit';

const multiply = curry((a: number, b: number) => a * b);
const subtract = curry((a: number, b: number) => a - b);
const divide = curry((a: number, b: number) => a / b);

// 완전히 적용하여 사용
multiply(3, 4);     // 12
subtract(10, 3);    // 7
divide(20, 4);      // 5

// 또는 부분 적용
const double = multiply(2);
const triple = multiply(3);
const half = divide(2);

double(5);   // 10
triple(5);   // 15
half(10);    // 5`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예제"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"배열 필터링과 매핑"}),e(n,{language:"typescript",code:`import { curry } from 'fp-kit';

const map = curry(<T, U>(fn: (x: T) => U, arr: T[]) => arr.map(fn));
const filter = curry(<T>(pred: (x: T) => boolean, arr: T[]) => arr.filter(pred));

const double = (n: number) => n * 2;
const isEven = (n: number) => n % 2 === 0;

// 특수화된 함수 생성
const doubleAll = map(double);
const filterEvens = filter(isEven);

const numbers = [1, 2, 3, 4, 5];

doubleAll(numbers);      // [2, 4, 6, 8, 10]
filterEvens(numbers);    // [2, 4]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"객체 속성 접근"}),e(n,{language:"typescript",code:`import { curry } from 'fp-kit';

const prop = curry(<T, K extends keyof T>(key: K, obj: T) => obj[key]);

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// 속성 추출기 생성
const getName = prop('name');
const getEmail = prop('email');

users.map(getName);   // ["Alice", "Bob"]
users.map(getEmail);  // ["alice@example.com", "bob@example.com"]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"curry와 pipe 결합"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"curry는 pipe나 compose와 결합할 때 빛을 발합니다. 부분 적용된 커리 함수는 파이프라인을 위한 깔끔하고 재사용 가능한 구성 요소를 만듭니다:"}),e(n,{language:"typescript",code:`import { pipe, curry } from 'fp-kit';

const add = curry((a: number, b: number) => a + b);
const multiply = curry((a: number, b: number) => a * b);
const subtract = curry((a: number, b: number) => a - b);

// 계산 파이프라인 구축
const calculate = pipe(
  add(10),        // 10 더하기
  multiply(2),    // 2배로
  subtract(5)     // 5 빼기
);

calculate(5);   // 25
// 흐름: 5 → +10 → 15 → *2 → 30 → -5 → 25`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"왜 Curry를 사용하나요?"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"1. 재사용성"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200",children:"일반 함수의 특수화된 버전을 만듭니다. 새로운 함수를 작성하는 대신 기존 함수를 부분 적용합니다."})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"2. 조합 가능성"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200",children:"커리된 함수는 pipe 및 compose와 아름답게 작동합니다. 부분 적용은 파이프라인에 완벽하게 맞는 함수를 만듭니다."})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"3. 설정"}),e("p",{class:"text-sm text-blue-800 dark:text-blue-200",children:"공통 매개변수로 함수를 한 번 설정한 다음 코드 전체에서 특수화된 버전을 사용합니다."})]}),e("div",{class:"border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-green-900 dark:text-green-100 mb-2",children:"4. 가독성"}),e("p",{class:"text-sm text-green-800 dark:text-green-200",children:"이름이 지정된 부분 적용 함수는 인라인 매개변수보다 코드를 더 자체 문서화합니다."})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"pipe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"커리된 함수를 pipe와 함께 가독성 있는 파이프라인으로 결합하세요."})]}),e("a",{href:"/composition/compose",onClick:t=>{t.preventDefault(),p("/composition/compose")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"compose →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"수학적 스타일의 함수 합성인 compose에 대해 알아보세요."})]})]})]}),Wn=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"partial"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Pre-fill function arguments to create specialized versions"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is partial?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"partial"})," ","creates a new function by fixing some leading arguments of an existing function.",e("br",{}),e("br",{}),"Unlike ",e("strong",{children:"curry"})," which enables sequential argument application, partial lets you ",e("strong",{children:"preset specific arguments"})," all at once, creating a specialized function that only needs the remaining parameters.",e("br",{}),e("br",{}),"This is perfect for configuration, dependency injection, and creating specialized utility functions."]}),e(n,{language:"typescript",code:`import { partial } from 'fp-kit';

// Original function
const greet = (greeting: string, name: string, punctuation: string) =>
  \`\${greeting}, \${name}\${punctuation}\`;

greet('Hello', 'Alice', '!');  // "Hello, Alice!"

// Preset the greeting
const sayHello = partial(greet, 'Hello');
sayHello('Bob', '!');      // "Hello, Bob!"

// Preset greeting and name
const sayHelloAlice = partial(greet, 'Hello', 'Alice');
sayHelloAlice('!');        // "Hello, Alice!"
sayHelloAlice('.');        // "Hello, Alice."`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Type Signature"}),e(n,{language:"typescript",code:`function partial<Args extends any[], Rest extends any[], R>(
  fn: (...args: [...Args, ...Rest]) => R,
  ...preset: Args
): (...rest: Rest) => R;

// Args: The arguments you want to preset
// Rest: The remaining arguments the new function will accept
// R: The return type`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"partial provides full TypeScript support with type inference for preset and remaining arguments."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Basic Usage"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Simple Examples"}),e(n,{language:"typescript",code:`import { partial } from 'fp-kit';

// Math operations
const add3 = (a: number, b: number, c: number) => a + b + c;
const add5and10 = partial(add3, 5, 10);

add5and10(3);   // 18 (5 + 10 + 3)
add5and10(7);   // 22 (5 + 10 + 7)

// String formatting
const format = (template: string, value1: string, value2: string) =>
  template.replace('{0}', value1).replace('{1}', value2);

const userFormat = partial(format, 'User: {0}, Role: {1}');
userFormat('Alice', 'Admin');    // "User: Alice, Role: Admin"
userFormat('Bob', 'Editor');     // "User: Bob, Role: Editor"`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Array Operations"}),e(n,{language:"typescript",code:`import { partial } from 'fp-kit';

const slice = <T>(arr: T[], start: number, end: number) =>
  arr.slice(start, end);

// Create specialized slicers
const takeFirst3 = partial(slice, [], 0, 3);
const skipFirst2 = partial(slice, [], 2);

const numbers = [1, 2, 3, 4, 5];

// Wait, this won't work as expected!
// partial fixes leading arguments, not arbitrary positions

// Better approach:
const sliceFrom = (start: number, end: number, arr: any[]) =>
  arr.slice(start, end);

const takeFirst3Better = partial(sliceFrom, 0, 3);
const skipFirst2Better = partial(sliceFrom, 2, 999);

takeFirst3Better(numbers);    // [1, 2, 3]
skipFirst2Better(numbers);    // [3, 4, 5]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Practical Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"API Client Configuration"}),e(n,{language:"typescript",code:`import { partial } from 'fp-kit';

// Generic fetch function
const apiFetch = async (
  baseUrl: string,
  headers: Record<string, string>,
  endpoint: string,
  options?: RequestInit
) => {
  return fetch(\`\${baseUrl}\${endpoint}\`, {
    ...options,
    headers: { ...headers, ...options?.headers },
  });
};

// Configure for production API
const apiHeaders = {
  'Authorization': 'Bearer token123',
  'Content-Type': 'application/json',
};

const productionApi = partial(
  apiFetch,
  'https://api.example.com',
  apiHeaders
);

// Now use it with just the endpoint
productionApi('/users');
productionApi('/posts', { method: 'POST', body: '...' });`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Event Handlers"}),e(n,{language:"typescript",code:`import { partial } from 'fp-kit';

// Generic handler
const handleAction = (
  type: string,
  logger: (msg: string) => void,
  event: Event
) => {
  logger(\`\${type} action triggered\`);
  // Handle the event...
};

const consoleLogger = (msg: string) => console.log(msg);

// Create specialized handlers
const handleClick = partial(handleAction, 'click', consoleLogger);
const handleSubmit = partial(handleAction, 'submit', consoleLogger);

// Use in event listeners
button.addEventListener('click', handleClick);
form.addEventListener('submit', handleSubmit);`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Validation Functions"}),e(n,{language:"typescript",code:`import { partial } from 'fp-kit';

const validate = (
  ruleName: string,
  errorMessage: string,
  predicate: (value: any) => boolean,
  value: any
) => {
  if (!predicate(value)) {
    throw new Error(\`[\${ruleName}] \${errorMessage}\`);
  }
  return value;
};

// Create validators
const validateRequired = partial(
  validate,
  'required',
  'This field is required',
  (v: any) => v != null && v !== ''
);

const validateEmail = partial(
  validate,
  'email',
  'Invalid email format',
  (v: string) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v)
);

const validateMinLength = (min: number) => partial(
  validate,
  'minLength',
  \`Must be at least \${min} characters\`,
  (v: string) => v.length >= min
);

// Use validators
validateRequired('hello');           // "hello"
validateRequired('');                // Error!
validateEmail('test@example.com');   // "test@example.com"
validateEmail('invalid');            // Error!

const validate8Chars = validateMinLength(8);
validate8Chars('password');          // "password"
validate8Chars('short');             // Error!`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Combining partial with pipe"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"partial works great with pipe for creating data processing pipelines:"}),e(n,{language:"typescript",code:`import { pipe, partial } from 'fp-kit';

// Data transformation functions (note: data comes last!)
const filterBy = <T>(predicate: (item: T) => boolean, arr: T[]) =>
  arr.filter(predicate);

const mapTo = <T, U>(fn: (item: T) => U, arr: T[]) =>
  arr.map(fn);

const sortBy = <T>(fn: (item: T) => any, arr: T[]) =>
  [...arr].sort((a, b) => {
    const aVal = fn(a);
    const bVal = fn(b);
    return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
  });

interface Product {
  name: string;
  price: number;
  inStock: boolean;
}

// Create pipeline with partial
const processProducts = pipe(
  partial(filterBy, (p: Product) => p.inStock),
  partial(sortBy, (p: Product) => p.price),
  partial(mapTo, (p: Product) => p.name)
);

const products: Product[] = [
  { name: 'Laptop', price: 1000, inStock: true },
  { name: 'Mouse', price: 25, inStock: false },
  { name: 'Keyboard', price: 75, inStock: true },
  { name: 'Monitor', price: 300, inStock: true },
];

processProducts(products);
// ["Keyboard", "Monitor", "Laptop"]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"partial vs curry"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"partial - Preset Arguments"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200 mb-2",children:"Fix multiple leading arguments at once. Returns a regular function that takes the remaining arguments."}),e(n,{language:"typescript",code:`const add3 = (a: number, b: number, c: number) => a + b + c;
const add10and20 = partial(add3, 10, 20);
add10and20(5);  // 35 (10 + 20 + 5)`})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"curry - Sequential Application"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200 mb-2",children:"Apply arguments one at a time or all at once. Each partial application returns another curried function."}),e(n,{language:"typescript",code:`const add3 = curry((a: number, b: number, c: number) => a + b + c);
add3(10)(20)(5);     // 35
add3(10, 20)(5);     // 35
add3(10)(20, 5);     // 35`})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"When to use which?"}),e("ul",{class:"text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside",children:[e("li",{children:[e("strong",{children:"Use partial"}),": Configuration, dependency injection, fixing multiple args"]}),e("li",{children:[e("strong",{children:"Use curry"}),": Flexible composition, point-free style, functional pipelines"]})]})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Implementation Details"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:["partial preserves the ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"this"})," context and combines preset arguments with runtime arguments:"]}),e(n,{language:"typescript",code:`function partial<Args extends any[], Rest extends any[], R>(
  fn: (...args: [...Args, ...Rest]) => R,
  ...preset: Args
): (...rest: Rest) => R {
  return function partiallyApplied(this: unknown, ...rest: Rest) {
    const all = [...preset, ...rest] as [...Args, ...Rest];
    return fn.apply(this as any, all);
  };
}`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:["The use of ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"fn.apply(this, ...)"})," ensures that method calls preserve their context."]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/curry",onClick:t=>{t.preventDefault(),p("/composition/curry")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-pink-600 dark:text-pink-400 mb-2",children:"curry →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Learn about curry for sequential argument application and flexible composition."})]}),e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"pipe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Combine partially applied functions in readable pipelines with pipe."})]})]})]}),Gn=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"partial"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"함수의 인자를 미리 고정하여 특수화된 버전 생성"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"partial이란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"partial"})," ","은 기존 함수의 일부 앞쪽 인자들을 고정하여 새로운 함수를 생성합니다.",e("br",{}),e("br",{}),"순차적인 인자 적용을 가능하게 하는 ",e("strong",{children:"curry"}),"와 달리, partial은",e("strong",{children:"특정 인자들을 한 번에 미리 설정"}),"하여 나머지 매개변수만 필요로 하는 특수화된 함수를 만듭니다.",e("br",{}),e("br",{}),"이는 설정, 의존성 주입, 특수화된 유틸리티 함수 생성에 완벽합니다."]}),e(n,{language:"typescript",code:`import { partial } from 'fp-kit';

// 원본 함수
const greet = (greeting: string, name: string, punctuation: string) =>
  \`\${greeting}, \${name}\${punctuation}\`;

greet('Hello', 'Alice', '!');  // "Hello, Alice!"

// 인사말 미리 설정
const sayHello = partial(greet, 'Hello');
sayHello('Bob', '!');      // "Hello, Bob!"

// 인사말과 이름 미리 설정
const sayHelloAlice = partial(greet, 'Hello', 'Alice');
sayHelloAlice('!');        // "Hello, Alice!"
sayHelloAlice('.');        // "Hello, Alice."`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"타입 시그니처"}),e(n,{language:"typescript",code:`function partial<Args extends any[], Rest extends any[], R>(
  fn: (...args: [...Args, ...Rest]) => R,
  ...preset: Args
): (...rest: Rest) => R;

// Args: 미리 설정할 인자들
// Rest: 새 함수가 받을 나머지 인자들
// R: 반환 타입`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"partial은 미리 설정된 인자와 나머지 인자에 대한 타입 추론을 완벽하게 지원합니다."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"기본 사용법"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"간단한 예제"}),e(n,{language:"typescript",code:`import { partial } from 'fp-kit';

// 수학 연산
const add3 = (a: number, b: number, c: number) => a + b + c;
const add5and10 = partial(add3, 5, 10);

add5and10(3);   // 18 (5 + 10 + 3)
add5and10(7);   // 22 (5 + 10 + 7)

// 문자열 포맷팅
const format = (template: string, value1: string, value2: string) =>
  template.replace('{0}', value1).replace('{1}', value2);

const userFormat = partial(format, 'User: {0}, Role: {1}');
userFormat('Alice', 'Admin');    // "User: Alice, Role: Admin"
userFormat('Bob', 'Editor');     // "User: Bob, Role: Editor"`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"배열 연산"}),e(n,{language:"typescript",code:`import { partial } from 'fp-kit';

// 파이프라인과 함께 사용하기 위해 데이터를 마지막에
const sliceFrom = (start: number, end: number, arr: any[]) =>
  arr.slice(start, end);

const takeFirst3 = partial(sliceFrom, 0, 3);
const skipFirst2 = partial(sliceFrom, 2, 999);

const numbers = [1, 2, 3, 4, 5];

takeFirst3(numbers);    // [1, 2, 3]
skipFirst2(numbers);    // [3, 4, 5]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예제"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"API 클라이언트 설정"}),e(n,{language:"typescript",code:`import { partial } from 'fp-kit';

// 범용 fetch 함수
const apiFetch = async (
  baseUrl: string,
  headers: Record<string, string>,
  endpoint: string,
  options?: RequestInit
) => {
  return fetch(\`\${baseUrl}\${endpoint}\`, {
    ...options,
    headers: { ...headers, ...options?.headers },
  });
};

// 프로덕션 API 설정
const apiHeaders = {
  'Authorization': 'Bearer token123',
  'Content-Type': 'application/json',
};

const productionApi = partial(
  apiFetch,
  'https://api.example.com',
  apiHeaders
);

// 이제 엔드포인트만 사용하면 됩니다
productionApi('/users');
productionApi('/posts', { method: 'POST', body: '...' });`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"이벤트 핸들러"}),e(n,{language:"typescript",code:`import { partial } from 'fp-kit';

// 범용 핸들러
const handleAction = (
  type: string,
  logger: (msg: string) => void,
  event: Event
) => {
  logger(\`\${type} action triggered\`);
  // 이벤트 처리...
};

const consoleLogger = (msg: string) => console.log(msg);

// 특수화된 핸들러 생성
const handleClick = partial(handleAction, 'click', consoleLogger);
const handleSubmit = partial(handleAction, 'submit', consoleLogger);

// 이벤트 리스너에서 사용
button.addEventListener('click', handleClick);
form.addEventListener('submit', handleSubmit);`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"검증 함수"}),e(n,{language:"typescript",code:`import { partial } from 'fp-kit';

const validate = (
  ruleName: string,
  errorMessage: string,
  predicate: (value: any) => boolean,
  value: any
) => {
  if (!predicate(value)) {
    throw new Error(\`[\${ruleName}] \${errorMessage}\`);
  }
  return value;
};

// 검증자 생성
const validateRequired = partial(
  validate,
  'required',
  '이 필드는 필수입니다',
  (v: any) => v != null && v !== ''
);

const validateEmail = partial(
  validate,
  'email',
  '유효하지 않은 이메일 형식',
  (v: string) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v)
);

const validateMinLength = (min: number) => partial(
  validate,
  'minLength',
  \`최소 \${min}자 이상이어야 합니다\`,
  (v: string) => v.length >= min
);

// 검증자 사용
validateRequired('hello');           // "hello"
validateRequired('');                // 에러!
validateEmail('test@example.com');   // "test@example.com"
validateEmail('invalid');            // 에러!

const validate8Chars = validateMinLength(8);
validate8Chars('password');          // "password"
validate8Chars('short');             // 에러!`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"partial과 pipe 결합"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"partial은 데이터 처리 파이프라인을 만드는 데 pipe와 함께 훌륭하게 작동합니다:"}),e(n,{language:"typescript",code:`import { pipe, partial } from 'fp-kit';

// 데이터 변환 함수 (참고: 데이터가 마지막에!)
const filterBy = <T>(predicate: (item: T) => boolean, arr: T[]) =>
  arr.filter(predicate);

const mapTo = <T, U>(fn: (item: T) => U, arr: T[]) =>
  arr.map(fn);

const sortBy = <T>(fn: (item: T) => any, arr: T[]) =>
  [...arr].sort((a, b) => {
    const aVal = fn(a);
    const bVal = fn(b);
    return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
  });

interface Product {
  name: string;
  price: number;
  inStock: boolean;
}

// partial로 파이프라인 생성
const processProducts = pipe(
  partial(filterBy, (p: Product) => p.inStock),
  partial(sortBy, (p: Product) => p.price),
  partial(mapTo, (p: Product) => p.name)
);

const products: Product[] = [
  { name: 'Laptop', price: 1000, inStock: true },
  { name: 'Mouse', price: 25, inStock: false },
  { name: 'Keyboard', price: 75, inStock: true },
  { name: 'Monitor', price: 300, inStock: true },
];

processProducts(products);
// ["Keyboard", "Monitor", "Laptop"]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"partial vs curry"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"partial - 인자 미리 설정"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200 mb-2",children:"여러 앞쪽 인자를 한 번에 고정합니다. 나머지 인자를 받는 일반 함수를 반환합니다."}),e(n,{language:"typescript",code:`const add3 = (a: number, b: number, c: number) => a + b + c;
const add10and20 = partial(add3, 10, 20);
add10and20(5);  // 35 (10 + 20 + 5)`})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"curry - 순차적 적용"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200 mb-2",children:"인자를 한 번에 하나씩 또는 모두 한 번에 적용합니다. 각 부분 적용은 또 다른 커리된 함수를 반환합니다."}),e(n,{language:"typescript",code:`const add3 = curry((a: number, b: number, c: number) => a + b + c);
add3(10)(20)(5);     // 35
add3(10, 20)(5);     // 35
add3(10)(20, 5);     // 35`})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"언제 무엇을 사용할까요?"}),e("ul",{class:"text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside",children:[e("li",{children:[e("strong",{children:"partial 사용"}),": 설정, 의존성 주입, 여러 인자 고정"]}),e("li",{children:[e("strong",{children:"curry 사용"}),": 유연한 조합, 포인트 프리 스타일, 함수형 파이프라인"]})]})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"구현 세부 사항"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:["partial은 ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"this"})," 컨텍스트를 보존하고 미리 설정된 인자와 런타임 인자를 결합합니다:"]}),e(n,{language:"typescript",code:`function partial<Args extends any[], Rest extends any[], R>(
  fn: (...args: [...Args, ...Rest]) => R,
  ...preset: Args
): (...rest: Rest) => R {
  return function partiallyApplied(this: unknown, ...rest: Rest) {
    const all = [...preset, ...rest] as [...Args, ...Rest];
    return fn.apply(this as any, all);
  };
}`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:[e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"fn.apply(this, ...)"})," 사용으로 메서드 호출 시 컨텍스트가 보존됩니다."]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/curry",onClick:t=>{t.preventDefault(),p("/composition/curry")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-pink-600 dark:text-pink-400 mb-2",children:"curry →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"순차적 인자 적용과 유연한 조합을 위한 curry에 대해 알아보세요."})]}),e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"pipe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"부분 적용된 함수를 pipe와 함께 가독성 있는 파이프라인으로 결합하세요."})]})]})]}),jn=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"flip"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Reverse the argument order of a function"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is flip?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"flip"})," ","takes a function and returns a new function with reversed argument order.",e("br",{}),e("br",{}),"This is especially useful when you need to adjust argument order for composition, partial application, or when working with functions that expect arguments in a different order.",e("br",{}),e("br",{}),"flip works seamlessly with functions of 2, 3, or more arguments, and preserves the original function's behavior."]}),e(n,{language:"typescript",code:`import { flip } from 'fp-kit';

// Original function
const divide = (a: number, b: number) => a / b;
divide(10, 2);  // 5

// Flipped version
const flippedDivide = flip(divide);
flippedDivide(2, 10);  // 5 (now divides 10 by 2)`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Basic Usage"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Binary Functions"}),e(n,{language:"typescript",code:`import { flip } from 'fp-kit';

const subtract = (a: number, b: number) => a - b;
const flippedSubtract = flip(subtract);

subtract(10, 3);          // 7
flippedSubtract(3, 10);   // 7 (same as subtract(10, 3))`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Variadic Functions"}),e(n,{language:"typescript",code:`import { flip } from 'fp-kit';

const concat = (...parts: Array<string | number>) => parts.join('-');
const flippedConcat = flip(concat);

concat('a', 'b', 1, 2);         // "a-b-1-2"
flippedConcat('a', 'b', 1, 2);  // "2-1-b-a"`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Real-World Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Adjusting for Composition"}),e(n,{language:"typescript",code:`import { flip, curry, pipe } from 'fp-kit';

// Sometimes APIs have arguments in an inconvenient order
const appendTo = (suffix: string, text: string) => text + suffix;

// Flip makes it easier to compose
const addExclamation = flip(appendTo)('!');

const shout = pipe(
  (text: string) => text.toUpperCase(),
  addExclamation
);

shout('hello');  // "HELLO!"`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Array Operations"}),e(n,{language:"typescript",code:`import { flip, curry } from 'fp-kit';

// Array.prototype.map expects (callback, thisArg)
// But we often want data last for composition
const map = curry(<T, U>(fn: (x: T) => U, arr: T[]) => arr.map(fn));

// With flip, we can make data-last versions
const mapOver = flip(map);

const double = (n: number) => n * 2;
const numbers = [1, 2, 3, 4];

// Now data comes first
mapOver(numbers, double);  // [2, 4, 6, 8]

// Perfect for partial application
const doubleAll = mapOver(numbers);
doubleAll(double);  // [2, 4, 6, 8]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"String Operations"}),e(n,{language:"typescript",code:`import { flip, curry } from 'fp-kit';

const replace = curry(
  (search: string, replacement: string, text: string) =>
    text.replace(search, replacement)
);

// Flip to make text the first argument
const replaceIn = flip(replace);

const text = "Hello World";
replaceIn(text, "World", "TypeScript");  // "Hello TypeScript"

// Or create specialized replacers
const sanitize = replaceIn(_, /[<>]/g, "");
sanitize("<script>alert('xss')<\/script>");  // "scriptalert('xss')/script"`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"flip with curry"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"flip and curry work beautifully together. After flipping, you can curry to enable partial application in the new argument order:"}),e(n,{language:"typescript",code:`import { flip, curry, pipe } from 'fp-kit';

const divide = (a: number, b: number) => a / b;

// Flip then curry for "divisor-first" partial application
const divideBy = curry(flip(divide));

const half = divideBy(2);      // Divide by 2
const third = divideBy(3);     // Divide by 3

half(10);   // 5
third(12);  // 4

// Use in pipelines
const calculate = pipe(
  (n: number) => n + 5,
  divideBy(2),
  Math.floor
);

calculate(7);  // 6
// Flow: 7 → +5 → 12 → ÷2 → 6 → floor → 6`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Why Use flip?"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"1. Argument Order Flexibility"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200",children:"Adapt functions to different composition styles without rewriting them. Data-last becomes data-first, or vice versa."})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"2. Better Composition"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200",children:"Align argument order for smooth function pipelines and compositions. Makes functions fit together naturally."})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"3. Partial Application"}),e("p",{class:"text-sm text-blue-800 dark:text-blue-200",children:"Combined with curry, flip enables partial application from different directions. Choose which arguments to fix first."})]}),e("div",{class:"border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-green-900 dark:text-green-100 mb-2",children:"4. API Adaptation"}),e("p",{class:"text-sm text-green-800 dark:text-green-200",children:"Adjust third-party APIs to match your preferred function signature style without wrapper functions."})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/curry",onClick:t=>{t.preventDefault(),p("/composition/curry")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-pink-600 dark:text-pink-400 mb-2",children:"curry →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Combine flip with curry for powerful partial application patterns."})]}),e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"pipe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Use flipped functions in readable data transformation pipelines."})]})]})]}),Vn=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"flip"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"함수의 인자 순서를 뒤집음"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"flip이란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"flip"})," ","은 함수를 받아 인자 순서가 뒤집힌 새로운 함수를 반환합니다.",e("br",{}),e("br",{}),"조합, 부분 적용, 또는 다른 순서로 인자를 받는 함수와 작업할 때 인자 순서를 조정해야 할 경우 특히 유용합니다.",e("br",{}),e("br",{}),"flip은 2개, 3개 이상의 인자를 가진 함수와 원활하게 작동하며 원래 함수의 동작을 보존합니다."]}),e(n,{language:"typescript",code:`import { flip } from 'fp-kit';

// 원래 함수
const divide = (a: number, b: number) => a / b;
divide(10, 2);  // 5

// 뒤집힌 버전
const flippedDivide = flip(divide);
flippedDivide(2, 10);  // 5 (이제 10을 2로 나눔)`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"기본 사용법"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"이항 함수"}),e(n,{language:"typescript",code:`import { flip } from 'fp-kit';

const subtract = (a: number, b: number) => a - b;
const flippedSubtract = flip(subtract);

subtract(10, 3);          // 7
flippedSubtract(3, 10);   // 7 (subtract(10, 3)과 동일)`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"가변 인자 함수"}),e(n,{language:"typescript",code:`import { flip } from 'fp-kit';

const concat = (...parts: Array<string | number>) => parts.join('-');
const flippedConcat = flip(concat);

concat('a', 'b', 1, 2);         // "a-b-1-2"
flippedConcat('a', 'b', 1, 2);  // "2-1-b-a"`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예제"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"조합을 위한 조정"}),e(n,{language:"typescript",code:`import { flip, curry, pipe } from 'fp-kit';

// 때때로 API는 불편한 순서로 인자를 받습니다
const appendTo = (suffix: string, text: string) => text + suffix;

// flip을 사용하면 조합하기 쉬워집니다
const addExclamation = flip(appendTo)('!');

const shout = pipe(
  (text: string) => text.toUpperCase(),
  addExclamation
);

shout('hello');  // "HELLO!"`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"배열 연산"}),e(n,{language:"typescript",code:`import { flip, curry } from 'fp-kit';

// Array.prototype.map은 (callback, thisArg)를 기대합니다
// 하지만 조합을 위해 데이터를 마지막에 두고 싶을 때가 많습니다
const map = curry(<T, U>(fn: (x: T) => U, arr: T[]) => arr.map(fn));

// flip을 사용하면 데이터-마지막 버전을 만들 수 있습니다
const mapOver = flip(map);

const double = (n: number) => n * 2;
const numbers = [1, 2, 3, 4];

// 이제 데이터가 먼저 옵니다
mapOver(numbers, double);  // [2, 4, 6, 8]

// 부분 적용에 완벽합니다
const doubleAll = mapOver(numbers);
doubleAll(double);  // [2, 4, 6, 8]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"문자열 연산"}),e(n,{language:"typescript",code:`import { flip, curry } from 'fp-kit';

const replace = curry(
  (search: string, replacement: string, text: string) =>
    text.replace(search, replacement)
);

// flip으로 text를 첫 번째 인자로 만듭니다
const replaceIn = flip(replace);

const text = "Hello World";
replaceIn(text, "World", "TypeScript");  // "Hello TypeScript"

// 또는 특수화된 replacer를 만듭니다
const sanitize = replaceIn(_, /[<>]/g, "");
sanitize("<script>alert('xss')<\/script>");  // "scriptalert('xss')/script"`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"flip과 curry 함께 사용하기"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"flip과 curry는 함께 아름답게 작동합니다. 뒤집은 후 curry를 사용하면 새로운 인자 순서로 부분 적용이 가능합니다:"}),e(n,{language:"typescript",code:`import { flip, curry, pipe } from 'fp-kit';

const divide = (a: number, b: number) => a / b;

// flip 후 curry로 "제수 우선" 부분 적용
const divideBy = curry(flip(divide));

const half = divideBy(2);      // 2로 나누기
const third = divideBy(3);     // 3으로 나누기

half(10);   // 5
third(12);  // 4

// 파이프라인에서 사용
const calculate = pipe(
  (n: number) => n + 5,
  divideBy(2),
  Math.floor
);

calculate(7);  // 6
// 흐름: 7 → +5 → 12 → ÷2 → 6 → floor → 6`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"왜 flip을 사용하나요?"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"1. 인자 순서 유연성"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200",children:"함수를 다시 작성하지 않고도 다양한 조합 스타일에 적응시킵니다. 데이터-마지막이 데이터-처음으로, 또는 그 반대로."})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"2. 더 나은 조합"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200",children:"원활한 함수 파이프라인과 조합을 위해 인자 순서를 정렬합니다. 함수들이 자연스럽게 맞물리게 만듭니다."})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"3. 부분 적용"}),e("p",{class:"text-sm text-blue-800 dark:text-blue-200",children:"curry와 결합하면 다른 방향에서의 부분 적용이 가능합니다. 어떤 인자를 먼저 고정할지 선택할 수 있습니다."})]}),e("div",{class:"border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-green-900 dark:text-green-100 mb-2",children:"4. API 적응"}),e("p",{class:"text-sm text-green-800 dark:text-green-200",children:"래퍼 함수 없이 서드파티 API를 선호하는 함수 시그니처 스타일에 맞게 조정합니다."})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/curry",onClick:t=>{t.preventDefault(),p("/composition/curry")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-pink-600 dark:text-pink-400 mb-2",children:"curry →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"강력한 부분 적용 패턴을 위해 flip과 curry를 결합하세요."})]}),e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"pipe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"가독성 있는 데이터 변환 파이프라인에서 뒤집힌 함수를 사용하세요."})]})]})]}),Kn=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"identity"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Returns the input value unchanged"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is identity?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"identity"})," ","is the simplest function in functional programming: it takes a value and returns it unchanged.",e("br",{}),e("br",{}),"While it may seem trivial, identity is fundamental to many functional patterns. It serves as a ",e("strong",{children:"neutral element"})," in composition, a default transformer, and a building block for more complex operations.",e("br",{}),e("br",{}),`Think of identity as the "do nothing" function that's surprisingly useful in practice.`]}),e(n,{language:"typescript",code:`import { identity } from 'fp-kit';

identity(5);        // 5
identity('hello');  // 'hello'
identity([1, 2]);   // [1, 2]

const obj = { a: 1 };
identity(obj) === obj;  // true (same reference)`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Why Use identity?"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"1. Default Transformation"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"When you need a transformation function but want to keep values unchanged:"}),e(n,{language:"typescript",code:`import { identity } from 'fp-kit';

// Conditional transformation
function processData<T>(
  data: T[],
  transform: (x: T) => T = identity
): T[] {
  return data.map(transform);
}

const numbers = [1, 2, 3];

// With transformation
processData(numbers, n => n * 2);  // [2, 4, 6]

// Without transformation (uses identity as default)
processData(numbers);  // [1, 2, 3]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"2. Neutral Element in Composition"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"identity acts as a neutral element with compose and pipe:"}),e(n,{language:"typescript",code:`import { compose, pipe, identity } from 'fp-kit';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;

// identity doesn't affect the pipeline
pipe(identity, double, addTen)(5);       // 20
pipe(double, identity, addTen)(5);       // 20
pipe(double, addTen, identity)(5);       // 20

// Useful when conditionally including transformations
const transforms = condition
  ? [double, addTen]
  : [identity];  // No-op when condition is false

pipe(...transforms)(5);`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"3. Placeholder in Higher-Order Functions"}),e(n,{language:"typescript",code:`import { identity } from 'fp-kit';

// Extract values from nested structures
interface User {
  id: number;
  profile?: {
    name: string;
  };
}

const users: User[] = [
  { id: 1, profile: { name: 'Alice' } },
  { id: 2, profile: { name: 'Bob' } },
];

// Get profiles, keeping structure
users.map(u => u.profile);  // Extract profiles

// When you want to keep the whole object
users.map(identity);  // Same as [...users]

// Filter with identity as predicate (removes falsy values)
[0, 1, '', 'hello', null, 42].filter(identity);  // [1, 'hello', 42]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Real-World Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Conditional Pipelines"}),e(n,{language:"typescript",code:`import { pipe, identity } from 'fp-kit';

interface Options {
  uppercase?: boolean;
  trim?: boolean;
  reverse?: boolean;
}

function processString(str: string, options: Options = {}) {
  return pipe(
    options.trim ? (s: string) => s.trim() : identity,
    options.uppercase ? (s: string) => s.toUpperCase() : identity,
    options.reverse ? (s: string) => s.split('').reverse().join('') : identity
  )(str);
}

processString('  hello  ', { uppercase: true, trim: true });
// "HELLO"

processString('  hello  ', {});
// "  hello  " (no transformations)`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Fallback Transformations"}),e(n,{language:"typescript",code:`import { identity } from 'fp-kit';

interface Config<T> {
  data: T[];
  transform?: (x: T) => T;
  filter?: (x: T) => boolean;
}

function processItems<T>(config: Config<T>): T[] {
  const transform = config.transform || identity;
  const filter = config.filter || (() => true);

  return config.data
    .filter(filter)
    .map(transform);
}

const numbers = [1, 2, 3, 4, 5];

// With transformations
processItems({
  data: numbers,
  transform: n => n * 2,
  filter: n => n > 2
});  // [6, 8, 10]

// Without transformations (uses identity)
processItems({ data: numbers });  // [1, 2, 3, 4, 5]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Monadic Operations"}),e(n,{language:"typescript",code:`import { identity } from 'fp-kit';

// flatMap with identity flattens one level
const nested = [[1, 2], [3, 4], [5]];
nested.flatMap(identity);  // [1, 2, 3, 4, 5]

// Compared to map (which keeps nesting)
nested.map(identity);  // [[1, 2], [3, 4], [5]]

// Chain optional operations
type Optional<T> = T | null | undefined;

function flatMapOptional<T, U>(
  value: Optional<T>,
  fn: (x: T) => Optional<U>
): Optional<U> {
  return value == null ? null : fn(value);
}

const maybeValue: Optional<number> = 42;

// When you just want to keep the value
flatMapOptional(maybeValue, identity);  // 42

// When you want to transform it
flatMapOptional(maybeValue, n => n * 2);  // 84`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"When to Use identity"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"1. Default Parameters"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200",children:"Use identity as a default transformation when functions accept optional transformers. It's better than null/undefined checks."})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"2. Conditional Transformations"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200",children:"When building pipelines conditionally, identity serves as a no-op transformation that keeps data flowing through unchanged."})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"3. Testing & Debugging"}),e("p",{class:"text-sm text-blue-800 dark:text-blue-200",children:"Replace complex transformations with identity temporarily to isolate issues in data processing pipelines."})]}),e("div",{class:"border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-green-900 dark:text-green-100 mb-2",children:"4. Composition Completeness"}),e("p",{class:"text-sm text-green-800 dark:text-green-200",children:"identity makes function composition algebraically complete, serving as the identity element (like 0 for addition or 1 for multiplication)."})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"pipe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Use identity in pipelines as a neutral transformation element."})]}),e("a",{href:"/composition/compose",onClick:t=>{t.preventDefault(),p("/composition/compose")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"compose →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Learn how identity serves as the identity element in function composition."})]})]})]}),qn=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"identity"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"입력값을 변경 없이 그대로 반환"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"identity란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"identity"})," ","는 함수형 프로그래밍에서 가장 간단한 함수입니다: 값을 받아서 변경 없이 그대로 반환합니다.",e("br",{}),e("br",{}),"사소해 보일 수 있지만, identity는 많은 함수형 패턴의 기초입니다. 조합에서 ",e("strong",{children:"중립 요소"}),"로 작동하고, 기본 변환자 역할을 하며, 더 복잡한 연산을 위한 빌딩 블록입니다.",e("br",{}),e("br",{}),'identity는 실제로는 놀랍도록 유용한 "아무것도 하지 않는" 함수라고 생각하세요.']}),e(n,{language:"typescript",code:`import { identity } from 'fp-kit';

identity(5);        // 5
identity('hello');  // 'hello'
identity([1, 2]);   // [1, 2]

const obj = { a: 1 };
identity(obj) === obj;  // true (동일한 참조)`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"왜 identity를 사용하나요?"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"1. 기본 변환"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"변환 함수가 필요하지만 값을 변경하지 않고 유지하고 싶을 때:"}),e(n,{language:"typescript",code:`import { identity } from 'fp-kit';

// 조건부 변환
function processData<T>(
  data: T[],
  transform: (x: T) => T = identity
): T[] {
  return data.map(transform);
}

const numbers = [1, 2, 3];

// 변환 적용
processData(numbers, n => n * 2);  // [2, 4, 6]

// 변환 없음 (identity를 기본값으로 사용)
processData(numbers);  // [1, 2, 3]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"2. 조합에서의 중립 요소"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"identity는 compose와 pipe에서 중립 요소로 작동합니다:"}),e(n,{language:"typescript",code:`import { compose, pipe, identity } from 'fp-kit';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;

// identity는 파이프라인에 영향을 주지 않습니다
pipe(identity, double, addTen)(5);       // 20
pipe(double, identity, addTen)(5);       // 20
pipe(double, addTen, identity)(5);       // 20

// 조건부로 변환을 포함할 때 유용합니다
const transforms = condition
  ? [double, addTen]
  : [identity];  // condition이 false일 때 no-op

pipe(...transforms)(5);`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"3. 고차 함수에서의 플레이스홀더"}),e(n,{language:"typescript",code:`import { identity } from 'fp-kit';

// 중첩된 구조에서 값 추출
interface User {
  id: number;
  profile?: {
    name: string;
  };
}

const users: User[] = [
  { id: 1, profile: { name: 'Alice' } },
  { id: 2, profile: { name: 'Bob' } },
];

// 프로필 추출, 구조 유지
users.map(u => u.profile);  // 프로필 추출

// 전체 객체를 유지하고 싶을 때
users.map(identity);  // [...users]와 동일

// identity를 predicate로 사용하여 필터 (falsy 값 제거)
[0, 1, '', 'hello', null, 42].filter(identity);  // [1, 'hello', 42]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예제"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"조건부 파이프라인"}),e(n,{language:"typescript",code:`import { pipe, identity } from 'fp-kit';

interface Options {
  uppercase?: boolean;
  trim?: boolean;
  reverse?: boolean;
}

function processString(str: string, options: Options = {}) {
  return pipe(
    options.trim ? (s: string) => s.trim() : identity,
    options.uppercase ? (s: string) => s.toUpperCase() : identity,
    options.reverse ? (s: string) => s.split('').reverse().join('') : identity
  )(str);
}

processString('  hello  ', { uppercase: true, trim: true });
// "HELLO"

processString('  hello  ', {});
// "  hello  " (변환 없음)`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"대체 변환"}),e(n,{language:"typescript",code:`import { identity } from 'fp-kit';

interface Config<T> {
  data: T[];
  transform?: (x: T) => T;
  filter?: (x: T) => boolean;
}

function processItems<T>(config: Config<T>): T[] {
  const transform = config.transform || identity;
  const filter = config.filter || (() => true);

  return config.data
    .filter(filter)
    .map(transform);
}

const numbers = [1, 2, 3, 4, 5];

// 변환 적용
processItems({
  data: numbers,
  transform: n => n * 2,
  filter: n => n > 2
});  // [6, 8, 10]

// 변환 없음 (identity 사용)
processItems({ data: numbers });  // [1, 2, 3, 4, 5]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"모나딕 연산"}),e(n,{language:"typescript",code:`import { identity } from 'fp-kit';

// flatMap과 identity를 사용하여 한 단계 평탄화
const nested = [[1, 2], [3, 4], [5]];
nested.flatMap(identity);  // [1, 2, 3, 4, 5]

// map과 비교 (중첩 유지)
nested.map(identity);  // [[1, 2], [3, 4], [5]]

// 옵셔널 연산 체이닝
type Optional<T> = T | null | undefined;

function flatMapOptional<T, U>(
  value: Optional<T>,
  fn: (x: T) => Optional<U>
): Optional<U> {
  return value == null ? null : fn(value);
}

const maybeValue: Optional<number> = 42;

// 값을 그대로 유지하고 싶을 때
flatMapOptional(maybeValue, identity);  // 42

// 변환하고 싶을 때
flatMapOptional(maybeValue, n => n * 2);  // 84`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"identity를 사용할 때"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"1. 기본 매개변수"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200",children:"함수가 옵셔널 변환자를 받을 때 identity를 기본 변환으로 사용하세요. null/undefined 체크보다 낫습니다."})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"2. 조건부 변환"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200",children:"파이프라인을 조건부로 구축할 때, identity는 데이터를 변경 없이 흐르게 하는 no-op 변환으로 사용됩니다."})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"3. 테스트 및 디버깅"}),e("p",{class:"text-sm text-blue-800 dark:text-blue-200",children:"데이터 처리 파이프라인에서 문제를 격리하기 위해 복잡한 변환을 일시적으로 identity로 교체하세요."})]}),e("div",{class:"border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-green-900 dark:text-green-100 mb-2",children:"4. 조합 완전성"}),e("p",{class:"text-sm text-green-800 dark:text-green-200",children:"identity는 함수 조합을 대수적으로 완전하게 만들며, 항등원소로 작용합니다 (덧셈의 0이나 곱셈의 1처럼)."})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"pipe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"파이프라인에서 identity를 중립 변환 요소로 사용하세요."})]}),e("a",{href:"/composition/compose",onClick:t=>{t.preventDefault(),p("/composition/compose")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"compose →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"함수 조합에서 identity가 항등원소로 작동하는 방법을 배우세요."})]})]})]}),Zn=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"constant"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Always return the same value"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is constant?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"constant"})," ","creates a function that always returns the same value, regardless of what arguments it receives (or even if it receives any).",e("br",{}),e("br",{}),"This simple utility is surprisingly useful in functional programming for"," ",e("strong",{children:"providing default values"}),", ",e("strong",{children:"ignoring function arguments"}),", and ",e("strong",{children:"creating placeholder functions"}),".",e("br",{}),e("br",{}),"Also known as ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"always"})," in some functional programming libraries."]}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

const alwaysTrue = constant(true);
const alwaysFive = constant(5);
const alwaysHello = constant('hello');

alwaysTrue();       // true
alwaysTrue(false);  // true (argument ignored)
alwaysTrue(1, 2, 3); // true (all arguments ignored)

alwaysFive();       // 5
alwaysHello();      // "hello"`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Type Signature"}),e(n,{language:"typescript",code:`function constant<T>(value: T): () => T;

// Takes any value
// Returns a function that always returns that value`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"The returned function ignores all arguments and always returns the same value with preserved reference identity."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Basic Usage"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Simple Examples"}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

// Primitive values
const alwaysZero = constant(0);
const alwaysEmpty = constant('');
const alwaysNull = constant(null);

alwaysZero();   // 0
alwaysEmpty();  // ""
alwaysNull();   // null

// Objects and arrays
const defaultUser = constant({ id: 0, name: 'Guest' });
const emptyArray = constant([]);

defaultUser();   // { id: 0, name: 'Guest' }
emptyArray();    // []

// Same reference every time
const arr1 = emptyArray();
const arr2 = emptyArray();
console.log(arr1 === arr2);  // true`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Ignoring Arguments"}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

const alwaysSuccess = constant({ status: 'success' });

// Works with any number of arguments
alwaysSuccess();                    // { status: 'success' }
alwaysSuccess('ignored');           // { status: 'success' }
alwaysSuccess(1, 2, 3, 'ignored');  // { status: 'success' }`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Practical Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Default Values and Fallbacks"}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
}

const defaultConfig = constant<Config>({
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
});

// Use as a factory for default values
function createClient(config?: Config) {
  const finalConfig = config || defaultConfig();
  // ...
}

// Or with nullish coalescing
function getConfig(userConfig?: Config): Config {
  return userConfig ?? defaultConfig();
}`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Array.map with Constant Values"}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

// Replace all values with a constant
const numbers = [1, 2, 3, 4, 5];
const allZeros = numbers.map(constant(0));
// [0, 0, 0, 0, 0]

const allTrue = numbers.map(constant(true));
// [true, true, true, true, true]

// Create an array of default objects
const users = ['Alice', 'Bob', 'Carol'];
const guestUsers = users.map(constant({ role: 'guest', active: false }));
// [
//   { role: 'guest', active: false },
//   { role: 'guest', active: false },
//   { role: 'guest', active: false }
// ]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Conditional Logic and Ternary"}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

// Instead of:
const getValue = (condition: boolean) => {
  return condition ? () => 'yes' : () => 'no';
};

// Use constant:
const getValueBetter = (condition: boolean) => {
  return condition ? constant('yes') : constant('no');
};

// In higher-order functions
function createHandler(isEnabled: boolean) {
  return isEnabled
    ? (data: any) => processData(data)
    : constant(null);  // Always return null when disabled
}

const handler = createHandler(false);
handler({ important: 'data' });  // null (data ignored)`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Event Handlers and Callbacks"}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

// Simple event handler that always returns the same action
const createClickHandler = (action: string) => {
  return constant({ type: action, timestamp: Date.now() });
};

const handleSubmit = createClickHandler('FORM_SUBMIT');
const handleCancel = createClickHandler('FORM_CANCEL');

// Use in React/UI frameworks
function Button({ disabled }: { disabled: boolean }) {
  const onClick = disabled
    ? constant(undefined)  // Do nothing when disabled
    : () => console.log('Clicked!');

  return <button onClick={onClick}>Click me</button>;
}

// Promise callbacks
Promise.resolve()
  .then(constant('success'))  // Always resolve with 'success'
  .then(value => console.log(value));  // "success"`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Default Function Arguments"}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

// Provide default transformer functions
function processItems<T, U>(
  items: T[],
  transform: (item: T) => U = constant(null) as any
): U[] {
  return items.map(transform);
}

// With default (returns nulls)
processItems([1, 2, 3]);
// [null, null, null]

// With custom transformer
processItems([1, 2, 3], x => x * 2);
// [2, 4, 6]

// Default error handler
function fetchData(
  url: string,
  onError: (error: Error) => void = constant(undefined)
) {
  return fetch(url).catch(onError);
}

// Silent failure (error ignored)
fetchData('/api/data');

// Custom error handling
fetchData('/api/data', err => console.error(err));`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Mocking and Testing"}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

// Mock functions in tests
const mockGetUser = constant({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
});

// Always returns the same mock data
expect(mockGetUser()).toEqual({ id: 1, name: 'Test User', ... });

// Mock API responses
const mockFetch = constant(
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: [] }),
  })
);

// Stub functions
const noop = constant(undefined);
const stub = {
  log: noop,
  error: noop,
  warn: noop
};`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Functional Programming Patterns"}),e(n,{language:"typescript",code:`import { constant, pipe } from 'fp-kit';

// Use in pipe for conditional logic
const processValue = (shouldDouble: boolean) => pipe(
  (n: number) => n + 10,
  shouldDouble
    ? (n: number) => n * 2
    : constant  // Pass through unchanged (always returns input)
);

// K combinator pattern (return first argument, ignore second)
const K = <T>(x: T) => constant(x);

const first = K(1)(999);  // 1 (999 ignored)
const name = K('Alice')('Bob');  // 'Alice' ('Bob' ignored)

// Creating placeholder/dummy implementations
interface DataService {
  fetch: () => Promise<any>;
  save: (data: any) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

const mockService: DataService = {
  fetch: constant(Promise.resolve([])),
  save: constant(Promise.resolve()),
  delete: constant(Promise.resolve()),
};`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Why Use constant?"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"1. Clarity of Intent"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200",children:["Using ",e("code",{class:"px-1 py-0.5 bg-pink-200 dark:bg-pink-800 rounded text-xs",children:"constant(value)"}),' clearly communicates "this always returns the same value" better than a lambda like'," ",e("code",{class:"px-1 py-0.5 bg-pink-200 dark:bg-pink-800 rounded text-xs",children:"() => value"}),"."]})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"2. Type Safety"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200",children:"Provides better type inference than manually written functions, especially with complex types."})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"3. Composability"}),e("p",{class:"text-sm text-blue-800 dark:text-blue-200",children:"Works seamlessly with higher-order functions like map, filter, and functional composition patterns."})]}),e("div",{class:"border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-green-900 dark:text-green-100 mb-2",children:"4. Reference Stability"}),e("p",{class:"text-sm text-green-800 dark:text-green-200",children:"The same value instance is returned every time, which is useful for React deps arrays and equality checks."})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"constant vs identity"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"constant - Returns Fixed Value"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200 mb-2",children:"Always returns the same value, ignoring all arguments."}),e(n,{language:"typescript",code:`const fn = constant(5);
fn();       // 5
fn(10);     // 5 (10 ignored)
fn(100);    // 5 (100 ignored)`})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"identity - Returns Input"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200 mb-2",children:"Returns whatever value it receives as an argument."}),e(n,{language:"typescript",code:`const fn = identity;
fn(5);      // 5
fn(10);     // 10
fn(100);    // 100`})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Implementation Details"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"constant is elegantly simple - it captures the value in a closure:"}),e(n,{language:"typescript",code:`function constant<T>(value: T): () => T {
  return () => value;
}`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:"The value is captured by the closure, so the same reference is returned every time the function is called. This is memory-efficient and maintains reference equality."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/identity",onClick:t=>{t.preventDefault(),p("/composition/identity")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"identity →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Learn about identity, which returns its input unchanged instead of a constant value."})]}),e("a",{href:"/composition/curry",onClick:t=>{t.preventDefault(),p("/composition/curry")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"curry →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Discover curry for creating flexible, partially applicable functions."})]})]})]}),Yn=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"constant"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"항상 같은 값을 반환"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"constant란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"constant"})," ","는 받은 인자와 관계없이 (또는 인자를 받지 않더라도) 항상 같은 값을 반환하는 함수를 생성합니다.",e("br",{}),e("br",{}),"이 간단한 유틸리티는 함수형 프로그래밍에서 ",e("strong",{children:"기본값 제공"}),","," ",e("strong",{children:"함수 인자 무시"}),", 그리고 ",e("strong",{children:"플레이스홀더 함수 생성"}),"에 놀랍도록 유용합니다.",e("br",{}),e("br",{}),"일부 함수형 프로그래밍 라이브러리에서는"," ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"always"}),"라고도 불립니다."]}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

const alwaysTrue = constant(true);
const alwaysFive = constant(5);
const alwaysHello = constant('hello');

alwaysTrue();       // true
alwaysTrue(false);  // true (인자 무시됨)
alwaysTrue(1, 2, 3); // true (모든 인자 무시됨)

alwaysFive();       // 5
alwaysHello();      // "hello"`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"타입 시그니처"}),e(n,{language:"typescript",code:`function constant<T>(value: T): () => T;

// 어떤 값이든 받음
// 항상 그 값을 반환하는 함수를 반환`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"반환된 함수는 모든 인자를 무시하고 항상 참조 동일성이 보존된 같은 값을 반환합니다."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"기본 사용법"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"간단한 예제"}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

// 원시 값
const alwaysZero = constant(0);
const alwaysEmpty = constant('');
const alwaysNull = constant(null);

alwaysZero();   // 0
alwaysEmpty();  // ""
alwaysNull();   // null

// 객체와 배열
const defaultUser = constant({ id: 0, name: 'Guest' });
const emptyArray = constant([]);

defaultUser();   // { id: 0, name: 'Guest' }
emptyArray();    // []

// 매번 같은 참조
const arr1 = emptyArray();
const arr2 = emptyArray();
console.log(arr1 === arr2);  // true`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"인자 무시"}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

const alwaysSuccess = constant({ status: 'success' });

// 어떤 개수의 인자에도 작동
alwaysSuccess();                    // { status: 'success' }
alwaysSuccess('ignored');           // { status: 'success' }
alwaysSuccess(1, 2, 3, 'ignored');  // { status: 'success' }`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예제"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"기본값과 폴백"}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
}

const defaultConfig = constant<Config>({
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
});

// 기본값 팩토리로 사용
function createClient(config?: Config) {
  const finalConfig = config || defaultConfig();
  // ...
}

// 또는 널 병합 연산자와 함께
function getConfig(userConfig?: Config): Config {
  return userConfig ?? defaultConfig();
}`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Array.map에서 상수 값 사용"}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

// 모든 값을 상수로 교체
const numbers = [1, 2, 3, 4, 5];
const allZeros = numbers.map(constant(0));
// [0, 0, 0, 0, 0]

const allTrue = numbers.map(constant(true));
// [true, true, true, true, true]

// 기본 객체 배열 생성
const users = ['Alice', 'Bob', 'Carol'];
const guestUsers = users.map(constant({ role: 'guest', active: false }));
// [
//   { role: 'guest', active: false },
//   { role: 'guest', active: false },
//   { role: 'guest', active: false }
// ]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"조건부 로직과 삼항 연산자"}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

// 이렇게 하는 대신:
const getValue = (condition: boolean) => {
  return condition ? () => 'yes' : () => 'no';
};

// constant 사용:
const getValueBetter = (condition: boolean) => {
  return condition ? constant('yes') : constant('no');
};

// 고차 함수에서
function createHandler(isEnabled: boolean) {
  return isEnabled
    ? (data: any) => processData(data)
    : constant(null);  // 비활성화 시 항상 null 반환
}

const handler = createHandler(false);
handler({ important: 'data' });  // null (데이터 무시됨)`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"이벤트 핸들러와 콜백"}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

// 항상 같은 액션을 반환하는 간단한 이벤트 핸들러
const createClickHandler = (action: string) => {
  return constant({ type: action, timestamp: Date.now() });
};

const handleSubmit = createClickHandler('FORM_SUBMIT');
const handleCancel = createClickHandler('FORM_CANCEL');

// React/UI 프레임워크에서 사용
function Button({ disabled }: { disabled: boolean }) {
  const onClick = disabled
    ? constant(undefined)  // 비활성화 시 아무것도 안 함
    : () => console.log('클릭됨!');

  return <button onClick={onClick}>클릭하세요</button>;
}

// Promise 콜백
Promise.resolve()
  .then(constant('success'))  // 항상 'success'로 resolve
  .then(value => console.log(value));  // "success"`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"기본 함수 인자"}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

// 기본 변환 함수 제공
function processItems<T, U>(
  items: T[],
  transform: (item: T) => U = constant(null) as any
): U[] {
  return items.map(transform);
}

// 기본값 사용 (null 반환)
processItems([1, 2, 3]);
// [null, null, null]

// 커스텀 변환기 사용
processItems([1, 2, 3], x => x * 2);
// [2, 4, 6]

// 기본 에러 핸들러
function fetchData(
  url: string,
  onError: (error: Error) => void = constant(undefined)
) {
  return fetch(url).catch(onError);
}

// 조용한 실패 (에러 무시됨)
fetchData('/api/data');

// 커스텀 에러 처리
fetchData('/api/data', err => console.error(err));`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"모킹과 테스팅"}),e(n,{language:"typescript",code:`import { constant } from 'fp-kit';

// 테스트에서 모의 함수
const mockGetUser = constant({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
});

// 항상 같은 모의 데이터 반환
expect(mockGetUser()).toEqual({ id: 1, name: 'Test User', ... });

// API 응답 모킹
const mockFetch = constant(
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: [] }),
  })
);

// 스텁 함수
const noop = constant(undefined);
const stub = {
  log: noop,
  error: noop,
  warn: noop
};`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"함수형 프로그래밍 패턴"}),e(n,{language:"typescript",code:`import { constant, pipe } from 'fp-kit';

// 조건부 로직을 위해 pipe에서 사용
const processValue = (shouldDouble: boolean) => pipe(
  (n: number) => n + 10,
  shouldDouble
    ? (n: number) => n * 2
    : constant  // 변경 없이 통과 (항상 입력 반환)
);

// K combinator 패턴 (첫 번째 인자 반환, 두 번째 무시)
const K = <T>(x: T) => constant(x);

const first = K(1)(999);  // 1 (999 무시됨)
const name = K('Alice')('Bob');  // 'Alice' ('Bob' 무시됨)

// 플레이스홀더/더미 구현 생성
interface DataService {
  fetch: () => Promise<any>;
  save: (data: any) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

const mockService: DataService = {
  fetch: constant(Promise.resolve([])),
  save: constant(Promise.resolve()),
  delete: constant(Promise.resolve()),
};`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"왜 constant를 사용하나요?"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"1. 의도의 명확성"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200",children:[e("code",{class:"px-1 py-0.5 bg-pink-200 dark:bg-pink-800 rounded text-xs",children:"constant(value)"}),"를 사용하면 람다인 ",e("code",{class:"px-1 py-0.5 bg-pink-200 dark:bg-pink-800 rounded text-xs",children:"() => value"}),'보다 "항상 같은 값을 반환한다"는 것을 더 명확하게 전달합니다.']})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"2. 타입 안정성"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200",children:"수동으로 작성한 함수보다 더 나은 타입 추론을 제공하며, 특히 복잡한 타입에서 그렇습니다."})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"3. 조합 가능성"}),e("p",{class:"text-sm text-blue-800 dark:text-blue-200",children:"map, filter와 같은 고차 함수 및 함수 조합 패턴과 원활하게 작동합니다."})]}),e("div",{class:"border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-green-900 dark:text-green-100 mb-2",children:"4. 참조 안정성"}),e("p",{class:"text-sm text-green-800 dark:text-green-200",children:"매번 같은 값 인스턴스가 반환되므로 React deps 배열 및 동등성 검사에 유용합니다."})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"constant vs identity"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"constant - 고정 값 반환"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200 mb-2",children:"모든 인자를 무시하고 항상 같은 값을 반환합니다."}),e(n,{language:"typescript",code:`const fn = constant(5);
fn();       // 5
fn(10);     // 5 (10 무시됨)
fn(100);    // 5 (100 무시됨)`})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"identity - 입력 반환"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200 mb-2",children:"인자로 받은 값을 그대로 반환합니다."}),e(n,{language:"typescript",code:`const fn = identity;
fn(5);      // 5
fn(10);     // 10
fn(100);    // 100`})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"구현 세부 사항"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"constant는 우아하게 단순합니다 - 클로저로 값을 캡처합니다:"}),e(n,{language:"typescript",code:`function constant<T>(value: T): () => T {
  return () => value;
}`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:"값은 클로저에 의해 캡처되므로 함수가 호출될 때마다 같은 참조가 반환됩니다. 이는 메모리 효율적이고 참조 동등성을 유지합니다."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/identity",onClick:t=>{t.preventDefault(),p("/composition/identity")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"identity →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"상수 값 대신 입력을 변경하지 않고 반환하는 identity에 대해 알아보세요."})]}),e("a",{href:"/composition/curry",onClick:t=>{t.preventDefault(),p("/composition/curry")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"curry →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"유연하고 부분 적용 가능한 함수를 만드는 curry를 알아보세요."})]})]})]}),Jn=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"memoize"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Cache function results for identical inputs"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is memoize?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"memoize"})," ","is a performance optimization technique that caches the results of expensive function calls.",e("br",{}),e("br",{}),"When you call a memoized function with the same arguments, it returns the cached result instead of re-computing it. This can dramatically improve performance for pure functions with expensive computations.",e("br",{}),e("br",{}),"memoize uses ",e("strong",{children:"reference equality"})," for arguments, meaning objects are compared by reference, not by value."]}),e(n,{language:"typescript",code:`import { memoize } from 'fp-kit';

// Expensive computation
const fibonacci = (n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

// Memoized version
const memoFib = memoize(fibonacci);

// First call computes
memoFib(40);  // Takes time...

// Second call returns cached result
memoFib(40);  // Instant!`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Basic Usage"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Simple Computations"}),e(n,{language:"typescript",code:`import { memoize } from 'fp-kit';

let callCount = 0;

const add = (a: number, b: number) => {
  callCount++;
  return a + b;
};

const memoAdd = memoize(add);

memoAdd(2, 3);  // 5 (callCount: 1)
memoAdd(2, 3);  // 5 (callCount: 1, cached!)
memoAdd(3, 2);  // 5 (callCount: 2, different args)`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Reference Equality"}),e(n,{language:"typescript",code:`import { memoize } from 'fp-kit';

const processUser = memoize((user: { name: string; age: number }) => {
  console.log('Processing...');
  return \`\${user.name} is \${user.age} years old\`;
});

const alice = { name: 'Alice', age: 30 };

processUser(alice);  // "Processing..." logged, returns result
processUser(alice);  // No log, cached!

// Different reference, even if same values
processUser({ name: 'Alice', age: 30 });  // "Processing..." logged again`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Real-World Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Data Transformation"}),e(n,{language:"typescript",code:`import { memoize } from 'fp-kit';

// Expensive data processing
const processDataset = memoize((data: any[]) => {
  console.log('Processing dataset...');
  return data
    .map(item => ({ ...item, processed: true }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);
});

const dataset = [
  { id: 1, value: 10 },
  { id: 2, value: -5 },
  { id: 3, value: 20 },
];

// First call: processes the data
const result1 = processDataset(dataset);

// Second call with same reference: instant
const result2 = processDataset(dataset);

console.log(result1 === result2);  // true (same cached result)`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"API Response Parsing"}),e(n,{language:"typescript",code:`import { memoize } from 'fp-kit';

interface RawUser {
  id: number;
  first_name: string;
  last_name: string;
}

interface User {
  id: number;
  fullName: string;
}

// Memoize transformation to avoid re-parsing
const parseUsers = memoize((rawUsers: RawUser[]): User[] => {
  console.log('Parsing users...');
  return rawUsers.map(raw => ({
    id: raw.id,
    fullName: \`\${raw.first_name} \${raw.last_name}\`,
  }));
});

const apiResponse = [
  { id: 1, first_name: 'Alice', last_name: 'Smith' },
  { id: 2, first_name: 'Bob', last_name: 'Jones' },
];

// Parse once
const users1 = parseUsers(apiResponse);

// Reuse if same response object
const users2 = parseUsers(apiResponse);

// Only logs "Parsing users..." once`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Expensive Calculations"}),e(n,{language:"typescript",code:`import { memoize } from 'fp-kit';

// Computationally expensive function
const isPrime = memoize((n: number): boolean => {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
});

// First check: computes
console.time('first');
isPrime(1000000007);
console.timeEnd('first');  // ~5ms

// Second check: cached
console.time('second');
isPrime(1000000007);
console.timeEnd('second');  // <0.1ms`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Recursive Functions"}),e(n,{language:"typescript",code:`import { memoize } from 'fp-kit';

// Classic example: Fibonacci
const fibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

// Without memoization: O(2^n) - exponential time
// With memoization: O(n) - linear time

fibonacci(10);  // Fast
fibonacci(50);  // Still fast! Without memo, this would hang
fibonacci(100); // Instant (if already computed smaller values)`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Important Considerations"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"1. Pure Functions Only"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200",children:"Only memoize pure functions (same inputs always produce same outputs). Functions with side effects or that depend on external state should not be memoized."})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"2. Reference Equality"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200",children:"Arguments are compared by reference, not value. Two objects with identical properties are treated as different if they're different instances."})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"3. Memory Usage"}),e("p",{class:"text-sm text-blue-800 dark:text-blue-200",children:"Memoization trades memory for speed. The cache grows with unique argument combinations. Don't memoize functions called with infinite unique inputs."})]}),e("div",{class:"border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-green-900 dark:text-green-100 mb-2",children:"4. When to Use"}),e("p",{class:"text-sm text-green-800 dark:text-green-200",children:"Best for expensive computations called repeatedly with the same inputs. Profile before optimizing - don't memoize unnecessarily."})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"When to Use memoize"}),e("div",{class:"grid gap-4 mt-6",children:[e("div",{class:"bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800",children:[e("h4",{class:"font-semibold text-green-900 dark:text-green-100 mb-2",children:"✓ Good Use Cases"}),e("ul",{class:"text-sm text-green-800 dark:text-green-200 list-disc list-inside space-y-1",children:[e("li",{children:"Expensive computations (mathematical calculations, parsing)"}),e("li",{children:"Recursive functions (fibonacci, factorial)"}),e("li",{children:"Data transformations called repeatedly"}),e("li",{children:"Functions with limited, repeated input patterns"})]})]}),e("div",{class:"bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800",children:[e("h4",{class:"font-semibold text-red-900 dark:text-red-100 mb-2",children:"✗ Avoid When"}),e("ul",{class:"text-sm text-red-800 dark:text-red-200 list-disc list-inside space-y-1",children:[e("li",{children:"Function has side effects (API calls, logging, mutations)"}),e("li",{children:"Infinite or unpredictable input variations"}),e("li",{children:"Function is already fast (overhead not worth it)"}),e("li",{children:"Results change based on time or external state"})]})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"pipe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Combine memoized functions in efficient data transformation pipelines."})]}),e("a",{href:"/composition/compose",onClick:t=>{t.preventDefault(),p("/composition/compose")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"compose →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Create composed functions with memoized intermediate steps."})]})]})]}),Xn=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"memoize"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"동일한 입력에 대해 함수 결과 캐싱"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"memoize란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"memoize"})," ","는 비용이 많이 드는 함수 호출의 결과를 캐싱하는 성능 최적화 기법입니다.",e("br",{}),e("br",{}),"memoize된 함수를 동일한 인자로 호출하면, 다시 계산하는 대신 캐시된 결과를 반환합니다. 이는 비용이 많이 드는 계산을 수행하는 순수 함수의 성능을 극적으로 향상시킬 수 있습니다.",e("br",{}),e("br",{}),"memoize는 인자에 대해 ",e("strong",{children:"참조 동등성"}),"을 사용합니다. 즉, 객체는 값이 아닌 참조로 비교됩니다."]}),e(n,{language:"typescript",code:`import { memoize } from 'fp-kit';

// 비용이 많이 드는 계산
const fibonacci = (n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

// Memoize된 버전
const memoFib = memoize(fibonacci);

// 첫 호출은 계산
memoFib(40);  // 시간 소요...

// 두 번째 호출은 캐시된 결과 반환
memoFib(40);  // 즉시!`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"기본 사용법"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"간단한 계산"}),e(n,{language:"typescript",code:`import { memoize } from 'fp-kit';

let callCount = 0;

const add = (a: number, b: number) => {
  callCount++;
  return a + b;
};

const memoAdd = memoize(add);

memoAdd(2, 3);  // 5 (callCount: 1)
memoAdd(2, 3);  // 5 (callCount: 1, 캐시됨!)
memoAdd(3, 2);  // 5 (callCount: 2, 다른 인자)`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"참조 동등성"}),e(n,{language:"typescript",code:`import { memoize } from 'fp-kit';

const processUser = memoize((user: { name: string; age: number }) => {
  console.log('처리 중...');
  return \`\${user.name}은(는) \${user.age}살입니다\`;
});

const alice = { name: 'Alice', age: 30 };

processUser(alice);  // "처리 중..." 로그, 결과 반환
processUser(alice);  // 로그 없음, 캐시됨!

// 값이 같아도 다른 참조면 다시 계산
processUser({ name: 'Alice', age: 30 });  // "처리 중..." 다시 로그`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예제"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"데이터 변환"}),e(n,{language:"typescript",code:`import { memoize } from 'fp-kit';

// 비용이 많이 드는 데이터 처리
const processDataset = memoize((data: any[]) => {
  console.log('데이터셋 처리 중...');
  return data
    .map(item => ({ ...item, processed: true }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);
});

const dataset = [
  { id: 1, value: 10 },
  { id: 2, value: -5 },
  { id: 3, value: 20 },
];

// 첫 호출: 데이터 처리
const result1 = processDataset(dataset);

// 같은 참조로 두 번째 호출: 즉시
const result2 = processDataset(dataset);

console.log(result1 === result2);  // true (같은 캐시된 결과)`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"API 응답 파싱"}),e(n,{language:"typescript",code:`import { memoize } from 'fp-kit';

interface RawUser {
  id: number;
  first_name: string;
  last_name: string;
}

interface User {
  id: number;
  fullName: string;
}

// 변환을 memoize하여 재파싱 방지
const parseUsers = memoize((rawUsers: RawUser[]): User[] => {
  console.log('사용자 파싱 중...');
  return rawUsers.map(raw => ({
    id: raw.id,
    fullName: \`\${raw.first_name} \${raw.last_name}\`,
  }));
});

const apiResponse = [
  { id: 1, first_name: 'Alice', last_name: 'Smith' },
  { id: 2, first_name: 'Bob', last_name: 'Jones' },
];

// 한 번 파싱
const users1 = parseUsers(apiResponse);

// 같은 응답 객체면 재사용
const users2 = parseUsers(apiResponse);

// "사용자 파싱 중..."은 한 번만 로그됨`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"비용이 많이 드는 계산"}),e(n,{language:"typescript",code:`import { memoize } from 'fp-kit';

// 계산 비용이 높은 함수
const isPrime = memoize((n: number): boolean => {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
});

// 첫 확인: 계산
console.time('첫 번째');
isPrime(1000000007);
console.timeEnd('첫 번째');  // ~5ms

// 두 번째 확인: 캐시됨
console.time('두 번째');
isPrime(1000000007);
console.timeEnd('두 번째');  // <0.1ms`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"재귀 함수"}),e(n,{language:"typescript",code:`import { memoize } from 'fp-kit';

// 전형적인 예제: 피보나치
const fibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

// memoize 없이: O(2^n) - 지수 시간
// memoize와 함께: O(n) - 선형 시간

fibonacci(10);  // 빠름
fibonacci(50);  // 여전히 빠름! memo 없으면 멈춤
fibonacci(100); // 즉시 (작은 값들이 이미 계산됐다면)`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"중요한 고려사항"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"1. 순수 함수만 사용"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200",children:"순수 함수만 memoize하세요 (같은 입력은 항상 같은 출력을 생성). 부작용이 있거나 외부 상태에 의존하는 함수는 memoize하면 안 됩니다."})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"2. 참조 동등성"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200",children:"인자는 값이 아닌 참조로 비교됩니다. 동일한 속성을 가진 두 객체라도 서로 다른 인스턴스면 다르게 취급됩니다."})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"3. 메모리 사용량"}),e("p",{class:"text-sm text-blue-800 dark:text-blue-200",children:"Memoize는 메모리를 속도와 교환합니다. 캐시는 고유한 인자 조합에 따라 증가합니다. 무한히 고유한 입력으로 호출되는 함수는 memoize하지 마세요."})]}),e("div",{class:"border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-green-900 dark:text-green-100 mb-2",children:"4. 사용 시기"}),e("p",{class:"text-sm text-green-800 dark:text-green-200",children:"같은 입력으로 반복적으로 호출되는 비용이 많이 드는 계산에 가장 적합합니다. 최적화하기 전에 프로파일링하세요 - 불필요하게 memoize하지 마세요."})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"memoize 사용 시기"}),e("div",{class:"grid gap-4 mt-6",children:[e("div",{class:"bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800",children:[e("h4",{class:"font-semibold text-green-900 dark:text-green-100 mb-2",children:"✓ 좋은 사용 사례"}),e("ul",{class:"text-sm text-green-800 dark:text-green-200 list-disc list-inside space-y-1",children:[e("li",{children:"비용이 많이 드는 계산 (수학 계산, 파싱)"}),e("li",{children:"재귀 함수 (피보나치, 팩토리얼)"}),e("li",{children:"반복적으로 호출되는 데이터 변환"}),e("li",{children:"제한적이고 반복적인 입력 패턴을 가진 함수"})]})]}),e("div",{class:"bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800",children:[e("h4",{class:"font-semibold text-red-900 dark:text-red-100 mb-2",children:"✗ 피해야 할 경우"}),e("ul",{class:"text-sm text-red-800 dark:text-red-200 list-disc list-inside space-y-1",children:[e("li",{children:"함수에 부작용이 있는 경우 (API 호출, 로깅, 변이)"}),e("li",{children:"무한하거나 예측 불가능한 입력 변형"}),e("li",{children:"함수가 이미 빠른 경우 (오버헤드가 가치가 없음)"}),e("li",{children:"결과가 시간이나 외부 상태에 따라 변하는 경우"})]})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"pipe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"효율적인 데이터 변환 파이프라인에서 memoize된 함수를 결합하세요."})]}),e("a",{href:"/composition/compose",onClick:t=>{t.preventDefault(),p("/composition/compose")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"compose →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"memoize된 중간 단계로 조합된 함수를 만드세요."})]})]})]}),Qn=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"once"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Create a function that only executes once"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is once?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"once"})," ","wraps a function so it can only be called once. After the first invocation, all subsequent calls return the cached result from that first execution.",e("br",{}),e("br",{}),"This is useful for ",e("strong",{children:"initialization functions"}),", ",e("strong",{children:"expensive operations"}),", and ensuring ",e("strong",{children:"side effects only happen once"}),".",e("br",{}),e("br",{}),"The first return value is memoized, even if it's ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"undefined"}),"."]}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

const initialize = once(() => {
  console.log('Initializing...');
  return { initialized: true };
});

initialize();  // Logs "Initializing..." and returns { initialized: true }
initialize();  // Returns { initialized: true } (no log)
initialize();  // Returns { initialized: true } (no log)`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Type Signature"}),e(n,{language:"typescript",code:`function once<T extends (...args: any[]) => any>(fn: T): T;

// Returns a function with the same signature as the input
// but only executes once`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"once preserves the original function's type signature and this context."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Basic Usage"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Simple Example"}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

const greet = once((name: string) => {
  console.log(\`Hello, \${name}!\`);
  return \`Greeted \${name}\`;
});

greet('Alice');  // Logs "Hello, Alice!" and returns "Greeted Alice"
greet('Bob');    // Returns "Greeted Alice" (no log, Bob is ignored)
greet('Carol');  // Returns "Greeted Alice" (no log, Carol is ignored)`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:"Notice that subsequent calls ignore their arguments - they always return the result from the first call."}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Expensive Computation"}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

const calculatePi = once(() => {
  console.log('Calculating pi...');
  // Expensive calculation
  let pi = 0;
  for (let i = 0; i < 1000000; i++) {
    pi += (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
  }
  return pi * 4;
});

const pi1 = calculatePi();  // Logs "Calculating pi..." and computes
const pi2 = calculatePi();  // Returns cached result instantly
const pi3 = calculatePi();  // Returns cached result instantly

console.log(pi1 === pi2);   // true
console.log(pi2 === pi3);   // true`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Practical Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Singleton Pattern"}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

class DatabaseConnection {
  constructor() {
    console.log('Connecting to database...');
  }

  query(sql: string) {
    return \`Result of: \${sql}\`;
  }
}

const getConnection = once(() => new DatabaseConnection());

// Use throughout your application
const conn1 = getConnection();  // Logs "Connecting to database..."
const conn2 = getConnection();  // Returns same instance
const conn3 = getConnection();  // Returns same instance

console.log(conn1 === conn2);   // true
console.log(conn2 === conn3);   // true`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Configuration Loading"}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

interface Config {
  apiUrl: string;
  apiKey: string;
  timeout: number;
}

const loadConfig = once((): Config => {
  console.log('Loading configuration...');

  // Expensive: reading from file, parsing, validating
  const config = {
    apiUrl: process.env.API_URL || 'https://api.example.com',
    apiKey: process.env.API_KEY || '',
    timeout: Number(process.env.TIMEOUT) || 5000,
  };

  // Validation
  if (!config.apiKey) {
    throw new Error('API_KEY is required');
  }

  return config;
});

// Use throughout your application
export const getConfig = loadConfig;

// First call loads and validates
const config1 = getConfig();

// Subsequent calls return cached config
const config2 = getConfig();
const config3 = getConfig();`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Event Handler Registration"}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

const setupGlobalHandlers = once(() => {
  console.log('Setting up global event handlers...');

  window.addEventListener('resize', () => {
    console.log('Window resized');
  });

  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      console.log('Escape pressed');
    }
  });

  return true;
});

// Call this in multiple places safely
setupGlobalHandlers();  // Sets up handlers
setupGlobalHandlers();  // Does nothing
setupGlobalHandlers();  // Does nothing`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Lazy Initialization"}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

class ExpensiveService {
  private data: string[];

  constructor() {
    console.log('Loading expensive data...');
    // Simulate expensive initialization
    this.data = Array.from({ length: 10000 }, (_, i) => \`Item \${i}\`);
  }

  search(query: string) {
    return this.data.filter(item => item.includes(query));
  }
}

// Lazy singleton - only created when first accessed
const getService = once(() => new ExpensiveService());

// No initialization happens yet
console.log('Application started');

// Service is created on first use
const results1 = getService().search('100');  // Logs "Loading expensive data..."

// Service is reused
const results2 = getService().search('200');  // No log`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Edge Cases"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Returning undefined"}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

const getNothing = once(() => {
  console.log('Called');
  return undefined;
});

getNothing();  // Logs "Called", returns undefined
getNothing();  // Returns undefined (no log)
getNothing();  // Returns undefined (no log)

// undefined is still cached!`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Different Arguments"}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

const add = once((a: number, b: number) => {
  console.log(\`Adding \${a} + \${b}\`);
  return a + b;
});

add(2, 3);   // Logs "Adding 2 + 3", returns 5
add(10, 20); // Returns 5 (arguments ignored!)
add(5, 7);   // Returns 5 (arguments ignored!)

// Once only executes with the first arguments
// All subsequent calls return the same cached result`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:[e("strong",{children:"Important:"})," If you need different results for different arguments, use ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"memoize"})," instead!"]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"once vs memoize"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"once - Single Execution"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200 mb-2",children:"Executes only on the first call. All subsequent calls return the same cached result, regardless of arguments."}),e(n,{language:"typescript",code:`const fn = once((x: number) => x * 2);
fn(2);  // 4
fn(3);  // 4 (not 6!)
fn(5);  // 4 (not 10!)`})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"memoize - Argument-Based Caching"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200 mb-2",children:"Caches results per unique argument combination. Different arguments produce different cached results."}),e(n,{language:"typescript",code:`const fn = memoize((x: number) => x * 2);
fn(2);  // 4 (computed)
fn(3);  // 6 (computed)
fn(2);  // 4 (cached)`})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"When to use which?"}),e("ul",{class:"text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside",children:[e("li",{children:[e("strong",{children:"Use once"}),": Initialization, singletons, one-time setup, ensuring side effects happen once"]}),e("li",{children:[e("strong",{children:"Use memoize"}),": Pure functions, expensive computations with varying inputs, caching API responses"]})]})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Implementation Details"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"once uses a closure to track whether the function has been called and stores the result:"}),e(n,{language:"typescript",code:`function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let value: any;

  const wrapped = function (this: any, ...args: any[]) {
    if (!called) {
      called = true;
      value = fn.apply(this, args);
    }
    return value;
  };

  return wrapped as T;
}`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:["The ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"called"})," flag ensures the function only executes once, and ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"value"})," stores the cached result. The use of ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"fn.apply(this, args)"})," preserves the this context."]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/memoize",onClick:t=>{t.preventDefault(),p("/composition/memoize")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"memoize →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Learn about memoize for caching results based on different arguments."})]}),e("a",{href:"/composition/tap",onClick:t=>{t.preventDefault(),p("/composition/tap")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"tap →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Execute side effects in pipelines while passing values through."})]})]})]}),ei=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"once"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"한 번만 실행되는 함수 생성"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"once란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"once"})," ","는 함수를 감싸서 단 한 번만 호출될 수 있도록 합니다. 첫 번째 호출 후에는 이후 모든 호출이 첫 번째 실행의 캐시된 결과를 반환합니다.",e("br",{}),e("br",{}),"이는 ",e("strong",{children:"초기화 함수"}),", ",e("strong",{children:"비용이 큰 작업"}),", 그리고 ",e("strong",{children:"부수 효과가 한 번만 발생"}),"하도록 보장하는 데 유용합니다.",e("br",{}),e("br",{}),"첫 번째 반환 값은 ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"undefined"}),"이더라도 메모이즈됩니다."]}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

const initialize = once(() => {
  console.log('초기화 중...');
  return { initialized: true };
});

initialize();  // "초기화 중..." 로그 출력 및 { initialized: true } 반환
initialize();  // { initialized: true } 반환 (로그 없음)
initialize();  // { initialized: true } 반환 (로그 없음)`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"타입 시그니처"}),e(n,{language:"typescript",code:`function once<T extends (...args: any[]) => any>(fn: T): T;

// 입력 함수와 동일한 시그니처를 가진 함수를 반환하지만
// 한 번만 실행됩니다`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"once는 원본 함수의 타입 시그니처와 this 컨텍스트를 보존합니다."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"기본 사용법"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"간단한 예제"}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

const greet = once((name: string) => {
  console.log(\`안녕하세요, \${name}님!\`);
  return \`\${name}님께 인사했습니다\`;
});

greet('Alice');  // "안녕하세요, Alice님!" 로그 출력 및 "Alice님께 인사했습니다" 반환
greet('Bob');    // "Alice님께 인사했습니다" 반환 (로그 없음, Bob은 무시됨)
greet('Carol');  // "Alice님께 인사했습니다" 반환 (로그 없음, Carol은 무시됨)`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:"이후 호출은 인자를 무시합니다 - 항상 첫 번째 호출의 결과를 반환합니다."}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"비용이 큰 계산"}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

const calculatePi = once(() => {
  console.log('파이 계산 중...');
  // 비용이 큰 계산
  let pi = 0;
  for (let i = 0; i < 1000000; i++) {
    pi += (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
  }
  return pi * 4;
});

const pi1 = calculatePi();  // "파이 계산 중..." 로그 출력 및 계산
const pi2 = calculatePi();  // 캐시된 결과를 즉시 반환
const pi3 = calculatePi();  // 캐시된 결과를 즉시 반환

console.log(pi1 === pi2);   // true
console.log(pi2 === pi3);   // true`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예제"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"싱글톤 패턴"}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

class DatabaseConnection {
  constructor() {
    console.log('데이터베이스에 연결 중...');
  }

  query(sql: string) {
    return \`결과: \${sql}\`;
  }
}

const getConnection = once(() => new DatabaseConnection());

// 애플리케이션 전체에서 사용
const conn1 = getConnection();  // "데이터베이스에 연결 중..." 로그 출력
const conn2 = getConnection();  // 같은 인스턴스 반환
const conn3 = getConnection();  // 같은 인스턴스 반환

console.log(conn1 === conn2);   // true
console.log(conn2 === conn3);   // true`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"설정 로딩"}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

interface Config {
  apiUrl: string;
  apiKey: string;
  timeout: number;
}

const loadConfig = once((): Config => {
  console.log('설정 로딩 중...');

  // 비용이 큼: 파일 읽기, 파싱, 검증
  const config = {
    apiUrl: process.env.API_URL || 'https://api.example.com',
    apiKey: process.env.API_KEY || '',
    timeout: Number(process.env.TIMEOUT) || 5000,
  };

  // 검증
  if (!config.apiKey) {
    throw new Error('API_KEY가 필요합니다');
  }

  return config;
});

// 애플리케이션 전체에서 사용
export const getConfig = loadConfig;

// 첫 번째 호출에서 로드하고 검증
const config1 = getConfig();

// 이후 호출은 캐시된 설정 반환
const config2 = getConfig();
const config3 = getConfig();`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"이벤트 핸들러 등록"}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

const setupGlobalHandlers = once(() => {
  console.log('전역 이벤트 핸들러 설정 중...');

  window.addEventListener('resize', () => {
    console.log('창 크기 변경됨');
  });

  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      console.log('Escape 키 눌림');
    }
  });

  return true;
});

// 여러 곳에서 안전하게 호출
setupGlobalHandlers();  // 핸들러 설정
setupGlobalHandlers();  // 아무것도 안 함
setupGlobalHandlers();  // 아무것도 안 함`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"지연 초기화"}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

class ExpensiveService {
  private data: string[];

  constructor() {
    console.log('비용이 큰 데이터 로딩 중...');
    // 비용이 큰 초기화 시뮬레이션
    this.data = Array.from({ length: 10000 }, (_, i) => \`항목 \${i}\`);
  }

  search(query: string) {
    return this.data.filter(item => item.includes(query));
  }
}

// 지연 싱글톤 - 처음 접근할 때만 생성
const getService = once(() => new ExpensiveService());

// 아직 초기화되지 않음
console.log('애플리케이션 시작됨');

// 첫 사용 시 서비스 생성
const results1 = getService().search('100');  // "비용이 큰 데이터 로딩 중..." 로그 출력

// 서비스 재사용
const results2 = getService().search('200');  // 로그 없음`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"엣지 케이스"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"undefined 반환"}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

const getNothing = once(() => {
  console.log('호출됨');
  return undefined;
});

getNothing();  // "호출됨" 로그 출력, undefined 반환
getNothing();  // undefined 반환 (로그 없음)
getNothing();  // undefined 반환 (로그 없음)

// undefined도 캐시됩니다!`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"다른 인자들"}),e(n,{language:"typescript",code:`import { once } from 'fp-kit';

const add = once((a: number, b: number) => {
  console.log(\`\${a} + \${b} 더하기\`);
  return a + b;
});

add(2, 3);   // "2 + 3 더하기" 로그 출력, 5 반환
add(10, 20); // 5 반환 (인자 무시됨!)
add(5, 7);   // 5 반환 (인자 무시됨!)

// Once는 첫 번째 인자로만 실행됩니다
// 이후 모든 호출은 같은 캐시된 결과를 반환합니다`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:[e("strong",{children:"중요:"})," 다른 인자에 대해 다른 결과가 필요하다면,",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"memoize"}),"를 대신 사용하세요!"]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"once vs memoize"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"once - 단일 실행"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200 mb-2",children:"첫 번째 호출에서만 실행됩니다. 이후 모든 호출은 인자에 관계없이 같은 캐시된 결과를 반환합니다."}),e(n,{language:"typescript",code:`const fn = once((x: number) => x * 2);
fn(2);  // 4
fn(3);  // 4 (6이 아님!)
fn(5);  // 4 (10이 아님!)`})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"memoize - 인자 기반 캐싱"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200 mb-2",children:"고유한 인자 조합마다 결과를 캐시합니다. 다른 인자는 다른 캐시된 결과를 생성합니다."}),e(n,{language:"typescript",code:`const fn = memoize((x: number) => x * 2);
fn(2);  // 4 (계산됨)
fn(3);  // 6 (계산됨)
fn(2);  // 4 (캐시됨)`})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"언제 무엇을 사용할까요?"}),e("ul",{class:"text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside",children:[e("li",{children:[e("strong",{children:"once 사용"}),": 초기화, 싱글톤, 일회성 설정, 부수 효과가 한 번만 발생하도록 보장"]}),e("li",{children:[e("strong",{children:"memoize 사용"}),": 순수 함수, 다양한 입력으로 비용이 큰 계산, API 응답 캐싱"]})]})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"구현 세부 사항"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"once는 클로저를 사용하여 함수가 호출되었는지 추적하고 결과를 저장합니다:"}),e(n,{language:"typescript",code:`function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let value: any;

  const wrapped = function (this: any, ...args: any[]) {
    if (!called) {
      called = true;
      value = fn.apply(this, args);
    }
    return value;
  };

  return wrapped as T;
}`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:[e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"called"})," 플래그는 함수가 한 번만 실행되도록 보장하고, ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"value"}),"는 캐시된 결과를 저장합니다. ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"fn.apply(this, args)"})," 사용으로 this 컨텍스트가 보존됩니다."]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/memoize",onClick:t=>{t.preventDefault(),p("/composition/memoize")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"memoize →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"다른 인자에 따라 결과를 캐싱하는 memoize에 대해 알아보세요."})]}),e("a",{href:"/composition/tap",onClick:t=>{t.preventDefault(),p("/composition/tap")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"tap →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"파이프라인에서 값을 전달하면서 부수 효과를 실행하세요."})]})]})]}),ti=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"tap"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Execute side effects without changing the value"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is tap?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"tap"})," ","allows you to perform side effects (like logging, debugging, or validation) in the middle of a pipeline while passing the value through unchanged.",e("br",{}),e("br",{}),"It takes a function that receives a value and performs some action, then returns the original value unmodified. This is perfect for ",e("strong",{children:"debugging pipelines"}),",",e("strong",{children:"logging intermediate values"}),", and ",e("strong",{children:"performing validations"}),".",e("br",{}),e("br",{}),'The name "tap" comes from the idea of "tapping into" a pipeline to observe or act on the flowing data without interrupting it.']}),e(n,{language:"typescript",code:`import { tap, pipe } from 'fp-kit';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;

const calculate = pipe(
  double,
  tap(x => console.log('After double:', x)),  // Log but don't change
  addTen,
  tap(x => console.log('After addTen:', x))   // Log but don't change
);

calculate(5);
// Logs: "After double: 10"
// Logs: "After addTen: 20"
// Returns: 20`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Type Signature"}),e(n,{language:"typescript",code:`function tap<T>(fn: (value: T) => void): (value: T) => T;

// Takes a function that receives a value and returns void
// Returns a function that passes the value through unchanged`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"The side effect function receives the value but its return value is ignored. tap always returns the original input value."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Basic Usage"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Simple Logging"}),e(n,{language:"typescript",code:`import { tap } from 'fp-kit';

const logValue = tap((x: number) => {
  console.log('Current value:', x);
});

const result = logValue(42);
// Logs: "Current value: 42"
// Returns: 42

console.log(result);  // 42`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"In a Pipeline"}),e(n,{language:"typescript",code:`import { pipe, tap } from 'fp-kit';

const processNumber = pipe(
  (n: number) => n * 2,
  tap(x => console.log('Doubled:', x)),
  (n: number) => n + 5,
  tap(x => console.log('Added 5:', x)),
  (n: number) => n.toString()
);

const result = processNumber(10);
// Logs: "Doubled: 20"
// Logs: "Added 5: 25"
// Returns: "25"`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Practical Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Debugging Data Transformations"}),e(n,{language:"typescript",code:`import { pipe, tap } from 'fp-kit';

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', active: true },
  { id: 2, name: 'Bob', email: 'bob@example.com', active: false },
  { id: 3, name: 'Carol', email: 'carol@example.com', active: true },
];

const processUsers = pipe(
  tap((users: User[]) => console.log('Input users:', users.length)),
  (users: User[]) => users.filter(u => u.active),
  tap((users: User[]) => console.log('Active users:', users.length)),
  (users: User[]) => users.map(u => u.email),
  tap((emails: string[]) => console.log('Emails:', emails))
);

const result = processUsers(users);
// Logs: "Input users: 3"
// Logs: "Active users: 2"
// Logs: "Emails: ['alice@example.com', 'carol@example.com']"
// Returns: ['alice@example.com', 'carol@example.com']`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Validation in Pipeline"}),e(n,{language:"typescript",code:`import { pipe, tap } from 'fp-kit';

const validatePositive = tap((n: number) => {
  if (n <= 0) {
    throw new Error(\`Expected positive number, got \${n}\`);
  }
});

const validateNotNaN = tap((n: number) => {
  if (isNaN(n)) {
    throw new Error('Value is NaN');
  }
});

const safeDivide = (divisor: number) => pipe(
  validateNotNaN,
  validatePositive,
  (n: number) => n / divisor
);

safeDivide(2)(10);  // 5
safeDivide(2)(0);   // Error: Expected positive number, got 0
safeDivide(2)(NaN); // Error: Value is NaN`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Analytics and Tracking"}),e(n,{language:"typescript",code:`import { pipe, tap } from 'fp-kit';

// Mock analytics function
const trackEvent = (event: string, data: any) => {
  console.log(\`[Analytics] \${event}\`, data);
};

interface Order {
  id: string;
  items: string[];
  total: number;
}

const processOrder = pipe(
  tap((order: Order) => trackEvent('order.started', { orderId: order.id })),
  (order: Order) => ({
    ...order,
    total: order.items.length * 10,
  }),
  tap((order: Order) => trackEvent('order.calculated', {
    orderId: order.id,
    total: order.total
  })),
  (order: Order) => {
    // Save to database
    return { ...order, saved: true };
  },
  tap((order: Order) => trackEvent('order.completed', { orderId: order.id }))
);

const order = {
  id: 'ORD-123',
  items: ['item1', 'item2', 'item3'],
  total: 0,
};

processOrder(order);
// Logs: "[Analytics] order.started { orderId: 'ORD-123' }"
// Logs: "[Analytics] order.calculated { orderId: 'ORD-123', total: 30 }"
// Logs: "[Analytics] order.completed { orderId: 'ORD-123' }"`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Cache Warming"}),e(n,{language:"typescript",code:`import { pipe, tap } from 'fp-kit';

const cache = new Map<string, any>();

const warmCache = <T>(key: string) => tap((data: T) => {
  console.log(\`Caching data with key: \${key}\`);
  cache.set(key, data);
});

interface ApiResponse {
  data: any[];
  timestamp: number;
}

const fetchAndCache = (endpoint: string) => pipe(
  (endpoint: string) => fetch(endpoint),
  (response: Response) => response.json(),
  warmCache<ApiResponse>(\`api:\${endpoint}\`),
  (data: ApiResponse) => data.data
);

// The data is cached as a side effect while flowing through
const data = await fetchAndCache('/api/users');`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Mutation Detection (Development)"}),e(n,{language:"typescript",code:`import { pipe, tap } from 'fp-kit';

// Helper to detect mutations in development
const detectMutation = <T extends object>(label: string) => {
  if (process.env.NODE_ENV !== 'development') {
    return tap(() => {});
  }

  let snapshot: string;

  return tap((value: T) => {
    const current = JSON.stringify(value);

    if (!snapshot) {
      snapshot = current;
    } else if (snapshot !== current) {
      console.warn(\`[\${label}] Mutation detected!\`);
      console.warn('Before:', snapshot);
      console.warn('After:', current);
    }
  });
};

const processData = pipe(
  detectMutation('start'),
  (data: any[]) => data.map(x => ({ ...x, processed: true })),
  detectMutation('after-map'),
  (data: any[]) => data.filter(x => x.active),
  detectMutation('after-filter')
);`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Common Patterns"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Conditional Logging"}),e(n,{language:"typescript",code:`import { tap } from 'fp-kit';

const debugLog = <T>(label: string) =>
  tap((value: T) => {
    if (process.env.DEBUG) {
      console.log(\`[DEBUG] \${label}:\`, value);
    }
  });

const verboseLog = <T>(label: string) =>
  tap((value: T) => {
    if (process.env.VERBOSE) {
      console.log(\`[VERBOSE] \${label}:\`, JSON.stringify(value, null, 2));
    }
  });`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Performance Monitoring"}),e(n,{language:"typescript",code:`import { pipe, tap } from 'fp-kit';

const measureTime = (label: string) => {
  let startTime: number;

  return {
    start: tap(() => {
      startTime = performance.now();
    }),
    end: tap(() => {
      const duration = performance.now() - startTime;
      console.log(\`\${label} took \${duration.toFixed(2)}ms\`);
    }),
  };
};

const timer = measureTime('Data processing');

const processData = pipe(
  timer.start,
  (data: number[]) => data.map(x => x * 2),
  (data: number[]) => data.filter(x => x > 10),
  (data: number[]) => data.reduce((sum, x) => sum + x, 0),
  timer.end
);

processData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// Logs: "Data processing took 0.23ms"`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"State Updates"}),e(n,{language:"typescript",code:`import { pipe, tap } from 'fp-kit';

let state = {
  count: 0,
  lastValue: null as any,
};

const updateState = <T>(update: (value: T) => void) => tap(update);

const processValue = pipe(
  (n: number) => n * 2,
  updateState((n: number) => {
    state.count++;
    state.lastValue = n;
  }),
  (n: number) => n + 10
);

processValue(5);  // Returns 20, state = { count: 1, lastValue: 10 }
processValue(3);  // Returns 16, state = { count: 2, lastValue: 6 }`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Why Use tap?"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"1. Non-Intrusive Debugging"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200",children:"Add or remove logging without changing your pipeline structure. Debug intermediate values without breaking the data flow."})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"2. Separation of Concerns"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200",children:"Keep side effects (logging, analytics, caching) separate from your main data transformation logic."})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"3. Pipeline Observability"}),e("p",{class:"text-sm text-blue-800 dark:text-blue-200",children:"Monitor and observe data as it flows through your pipelines without modifying the transformation logic."})]}),e("div",{class:"border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-green-900 dark:text-green-100 mb-2",children:"4. Immutability Preservation"}),e("p",{class:"text-sm text-green-800 dark:text-green-200",children:"Perform side effects while ensuring the value passes through unchanged, maintaining functional programming principles."})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Implementation Details"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"tap is elegantly simple - it executes the side effect and returns the original value:"}),e(n,{language:"typescript",code:`function tap<T>(fn: (value: T) => void): (value: T) => T {
  return (value: T) => {
    fn(value);
    return value;
  };
}`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:"The side effect function's return value is completely ignored. The original value always flows through unchanged."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"pipe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Learn how to build pipelines where tap shines for debugging and side effects."})]}),e("a",{href:"/composition/identity",onClick:t=>{t.preventDefault(),p("/composition/identity")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"identity →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Discover another utility for passing values through unchanged."})]})]})]}),ri=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"tap"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"값을 변경하지 않고 부수 효과 실행"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"tap이란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"tap"})," ","은 파이프라인 중간에 부수 효과(로깅, 디버깅, 검증 등)를 수행하면서 값을 변경하지 않고 그대로 전달할 수 있게 합니다.",e("br",{}),e("br",{}),"값을 받아 어떤 작업을 수행하는 함수를 받은 다음, 원본 값을 수정하지 않고 반환합니다. 이는 ",e("strong",{children:"파이프라인 디버깅"}),", ",e("strong",{children:"중간 값 로깅"}),", 그리고 ",e("strong",{children:"검증 수행"}),"에 완벽합니다.",e("br",{}),e("br",{}),'"tap"이라는 이름은 흐르는 데이터를 방해하지 않고 관찰하거나 작동하기 위해 파이프라인에 "tap into(탭 연결)"한다는 아이디어에서 유래했습니다.']}),e(n,{language:"typescript",code:`import { tap, pipe } from 'fp-kit';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;

const calculate = pipe(
  double,
  tap(x => console.log('double 후:', x)),  // 로그만 출력, 값은 변경 안 함
  addTen,
  tap(x => console.log('addTen 후:', x))   // 로그만 출력, 값은 변경 안 함
);

calculate(5);
// 로그: "double 후: 10"
// 로그: "addTen 후: 20"
// 반환: 20`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"타입 시그니처"}),e(n,{language:"typescript",code:`function tap<T>(fn: (value: T) => void): (value: T) => T;

// 값을 받고 void를 반환하는 함수를 받음
// 값을 변경하지 않고 전달하는 함수를 반환`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"부수 효과 함수는 값을 받지만 반환 값은 무시됩니다. tap은 항상 원본 입력 값을 반환합니다."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"기본 사용법"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"간단한 로깅"}),e(n,{language:"typescript",code:`import { tap } from 'fp-kit';

const logValue = tap((x: number) => {
  console.log('현재 값:', x);
});

const result = logValue(42);
// 로그: "현재 값: 42"
// 반환: 42

console.log(result);  // 42`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"파이프라인에서 사용"}),e(n,{language:"typescript",code:`import { pipe, tap } from 'fp-kit';

const processNumber = pipe(
  (n: number) => n * 2,
  tap(x => console.log('2배:', x)),
  (n: number) => n + 5,
  tap(x => console.log('5 더함:', x)),
  (n: number) => n.toString()
);

const result = processNumber(10);
// 로그: "2배: 20"
// 로그: "5 더함: 25"
// 반환: "25"`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예제"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"데이터 변환 디버깅"}),e(n,{language:"typescript",code:`import { pipe, tap } from 'fp-kit';

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', active: true },
  { id: 2, name: 'Bob', email: 'bob@example.com', active: false },
  { id: 3, name: 'Carol', email: 'carol@example.com', active: true },
];

const processUsers = pipe(
  tap((users: User[]) => console.log('입력 사용자:', users.length)),
  (users: User[]) => users.filter(u => u.active),
  tap((users: User[]) => console.log('활성 사용자:', users.length)),
  (users: User[]) => users.map(u => u.email),
  tap((emails: string[]) => console.log('이메일:', emails))
);

const result = processUsers(users);
// 로그: "입력 사용자: 3"
// 로그: "활성 사용자: 2"
// 로그: "이메일: ['alice@example.com', 'carol@example.com']"
// 반환: ['alice@example.com', 'carol@example.com']`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"파이프라인에서 검증"}),e(n,{language:"typescript",code:`import { pipe, tap } from 'fp-kit';

const validatePositive = tap((n: number) => {
  if (n <= 0) {
    throw new Error(\`양수를 기대했지만 \${n}을 받았습니다\`);
  }
});

const validateNotNaN = tap((n: number) => {
  if (isNaN(n)) {
    throw new Error('값이 NaN입니다');
  }
});

const safeDivide = (divisor: number) => pipe(
  validateNotNaN,
  validatePositive,
  (n: number) => n / divisor
);

safeDivide(2)(10);  // 5
safeDivide(2)(0);   // 에러: 양수를 기대했지만 0을 받았습니다
safeDivide(2)(NaN); // 에러: 값이 NaN입니다`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"분석 및 추적"}),e(n,{language:"typescript",code:`import { pipe, tap } from 'fp-kit';

// 모의 분석 함수
const trackEvent = (event: string, data: any) => {
  console.log(\`[분석] \${event}\`, data);
};

interface Order {
  id: string;
  items: string[];
  total: number;
}

const processOrder = pipe(
  tap((order: Order) => trackEvent('order.started', { orderId: order.id })),
  (order: Order) => ({
    ...order,
    total: order.items.length * 10,
  }),
  tap((order: Order) => trackEvent('order.calculated', {
    orderId: order.id,
    total: order.total
  })),
  (order: Order) => {
    // 데이터베이스에 저장
    return { ...order, saved: true };
  },
  tap((order: Order) => trackEvent('order.completed', { orderId: order.id }))
);

const order = {
  id: 'ORD-123',
  items: ['item1', 'item2', 'item3'],
  total: 0,
};

processOrder(order);
// 로그: "[분석] order.started { orderId: 'ORD-123' }"
// 로그: "[분석] order.calculated { orderId: 'ORD-123', total: 30 }"
// 로그: "[분석] order.completed { orderId: 'ORD-123' }"`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"캐시 워밍"}),e(n,{language:"typescript",code:`import { pipe, tap } from 'fp-kit';

const cache = new Map<string, any>();

const warmCache = <T>(key: string) => tap((data: T) => {
  console.log(\`키로 데이터 캐싱: \${key}\`);
  cache.set(key, data);
});

interface ApiResponse {
  data: any[];
  timestamp: number;
}

const fetchAndCache = (endpoint: string) => pipe(
  (endpoint: string) => fetch(endpoint),
  (response: Response) => response.json(),
  warmCache<ApiResponse>(\`api:\${endpoint}\`),
  (data: ApiResponse) => data.data
);

// 데이터가 흐르는 동안 부수 효과로 캐시됩니다
const data = await fetchAndCache('/api/users');`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"변이 감지 (개발 환경)"}),e(n,{language:"typescript",code:`import { pipe, tap } from 'fp-kit';

// 개발 환경에서 변이를 감지하는 헬퍼
const detectMutation = <T extends object>(label: string) => {
  if (process.env.NODE_ENV !== 'development') {
    return tap(() => {});
  }

  let snapshot: string;

  return tap((value: T) => {
    const current = JSON.stringify(value);

    if (!snapshot) {
      snapshot = current;
    } else if (snapshot !== current) {
      console.warn(\`[\${label}] 변이가 감지되었습니다!\`);
      console.warn('이전:', snapshot);
      console.warn('이후:', current);
    }
  });
};

const processData = pipe(
  detectMutation('시작'),
  (data: any[]) => data.map(x => ({ ...x, processed: true })),
  detectMutation('map 후'),
  (data: any[]) => data.filter(x => x.active),
  detectMutation('filter 후')
);`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"일반적인 패턴"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"조건부 로깅"}),e(n,{language:"typescript",code:`import { tap } from 'fp-kit';

const debugLog = <T>(label: string) =>
  tap((value: T) => {
    if (process.env.DEBUG) {
      console.log(\`[DEBUG] \${label}:\`, value);
    }
  });

const verboseLog = <T>(label: string) =>
  tap((value: T) => {
    if (process.env.VERBOSE) {
      console.log(\`[VERBOSE] \${label}:\`, JSON.stringify(value, null, 2));
    }
  });`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"성능 모니터링"}),e(n,{language:"typescript",code:`import { pipe, tap } from 'fp-kit';

const measureTime = (label: string) => {
  let startTime: number;

  return {
    start: tap(() => {
      startTime = performance.now();
    }),
    end: tap(() => {
      const duration = performance.now() - startTime;
      console.log(\`\${label} 소요 시간: \${duration.toFixed(2)}ms\`);
    }),
  };
};

const timer = measureTime('데이터 처리');

const processData = pipe(
  timer.start,
  (data: number[]) => data.map(x => x * 2),
  (data: number[]) => data.filter(x => x > 10),
  (data: number[]) => data.reduce((sum, x) => sum + x, 0),
  timer.end
);

processData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// 로그: "데이터 처리 소요 시간: 0.23ms"`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"상태 업데이트"}),e(n,{language:"typescript",code:`import { pipe, tap } from 'fp-kit';

let state = {
  count: 0,
  lastValue: null as any,
};

const updateState = <T>(update: (value: T) => void) => tap(update);

const processValue = pipe(
  (n: number) => n * 2,
  updateState((n: number) => {
    state.count++;
    state.lastValue = n;
  }),
  (n: number) => n + 10
);

processValue(5);  // 20 반환, state = { count: 1, lastValue: 10 }
processValue(3);  // 16 반환, state = { count: 2, lastValue: 6 }`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"왜 tap을 사용하나요?"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"1. 비침습적 디버깅"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200",children:"파이프라인 구조를 변경하지 않고 로깅을 추가하거나 제거할 수 있습니다. 데이터 흐름을 깨지 않고 중간 값을 디버그할 수 있습니다."})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"2. 관심사 분리"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200",children:"부수 효과(로깅, 분석, 캐싱)를 주요 데이터 변환 로직과 분리합니다."})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"3. 파이프라인 관찰성"}),e("p",{class:"text-sm text-blue-800 dark:text-blue-200",children:"변환 로직을 수정하지 않고 파이프라인을 통과하는 데이터를 모니터링하고 관찰할 수 있습니다."})]}),e("div",{class:"border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-green-900 dark:text-green-100 mb-2",children:"4. 불변성 보존"}),e("p",{class:"text-sm text-green-800 dark:text-green-200",children:"값이 변경되지 않고 전달되도록 보장하면서 부수 효과를 수행하여 함수형 프로그래밍 원칙을 유지합니다."})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"구현 세부 사항"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"tap은 우아하게 단순합니다 - 부수 효과를 실행하고 원본 값을 반환합니다:"}),e(n,{language:"typescript",code:`function tap<T>(fn: (value: T) => void): (value: T) => T {
  return (value: T) => {
    fn(value);
    return value;
  };
}`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:"부수 효과 함수의 반환 값은 완전히 무시됩니다. 원본 값은 항상 변경되지 않고 흐릅니다."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"pipe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"tap이 디버깅과 부수 효과에 빛을 발하는 파이프라인 구축 방법을 배우세요."})]}),e("a",{href:"/composition/identity",onClick:t=>{t.preventDefault(),p("/composition/identity")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"identity →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"값을 변경하지 않고 전달하는 또 다른 유틸리티를 알아보세요."})]})]})]}),ai=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"chunk"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Split an array into chunks of specified size"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is chunk?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"chunk"})," ","divides an array into smaller arrays (chunks) of a specified size. The last chunk may contain fewer elements if the array length is not evenly divisible by the chunk size.",e("br",{}),e("br",{}),"This is useful for ",e("strong",{children:"pagination"}),", ",e("strong",{children:"batch processing"}),",",e("strong",{children:"grid layouts"}),", and ",e("strong",{children:"splitting data into groups"}),"."]}),e(n,{language:"typescript",code:`import { chunk } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

chunk(3, numbers);
// [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

chunk(4, numbers);
// [[1, 2, 3, 4], [5, 6, 7, 8], [9]]

chunk(2, numbers);
// [[1, 2], [3, 4], [5, 6], [7, 8], [9]]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Type Signature"}),e(n,{language:"typescript",code:`function chunk<T>(size: number, arr: T[]): T[][];

// Takes chunk size and array
// Returns an array of chunks`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"The size is automatically floored to an integer. If size is 0, negative, or not finite, an empty array is returned."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Basic Usage"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Simple Examples"}),e(n,{language:"typescript",code:`import { chunk } from 'fp-kit';

// Split into pairs
const pairs = chunk(2, [1, 2, 3, 4, 5, 6]);
// [[1, 2], [3, 4], [5, 6]]

// Split into triplets
const triplets = chunk(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']);
// [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]

// Last chunk may be smaller
const groups = chunk(5, [1, 2, 3, 4, 5, 6, 7]);
// [[1, 2, 3, 4, 5], [6, 7]]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Practical Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Pagination"}),e(n,{language:"typescript",code:`import { chunk } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 75 },
  { id: 4, name: 'Monitor', price: 300 },
  { id: 5, name: 'Headphones', price: 150 },
  { id: 6, name: 'Webcam', price: 80 },
  { id: 7, name: 'Microphone', price: 120 },
];

const ITEMS_PER_PAGE = 3;
const pages = chunk(ITEMS_PER_PAGE, products);

// Page 1: [{ id: 1, ... }, { id: 2, ... }, { id: 3, ... }]
// Page 2: [{ id: 4, ... }, { id: 5, ... }, { id: 6, ... }]
// Page 3: [{ id: 7, ... }]

function getPage(pageNumber: number) {
  return pages[pageNumber - 1] || [];
}

getPage(1); // First 3 products
getPage(2); // Next 3 products
getPage(3); // Last product`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Grid Layout"}),e(n,{language:"typescript",code:`import { chunk } from 'fp-kit';

const images = [
  'img1.jpg', 'img2.jpg', 'img3.jpg',
  'img4.jpg', 'img5.jpg', 'img6.jpg',
  'img7.jpg', 'img8.jpg', 'img9.jpg',
  'img10.jpg'
];

const COLUMNS = 3;
const rows = chunk(COLUMNS, images);

// Render as grid
rows.forEach(row => {
  console.log('Row:', row);
});
// Row: ['img1.jpg', 'img2.jpg', 'img3.jpg']
// Row: ['img4.jpg', 'img5.jpg', 'img6.jpg']
// Row: ['img7.jpg', 'img8.jpg', 'img9.jpg']
// Row: ['img10.jpg']

// In React
function ImageGrid({ images }: { images: string[] }) {
  const rows = chunk(3, images);

  return (
    <div>
      {rows.map((row, i) => (
        <div key={i} class="grid grid-cols-3 gap-4">
          {row.map((img, j) => (
            <img key={j} src={img} alt="" />
          ))}
        </div>
      ))}
    </div>
  );
}`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Batch Processing"}),e(n,{language:"typescript",code:`import { chunk } from 'fp-kit';

async function processInBatches<T>(
  items: T[],
  batchSize: number,
  processor: (batch: T[]) => Promise<void>
) {
  const batches = chunk(batchSize, items);

  for (const batch of batches) {
    await processor(batch);
  }
}

// Process 1000 items in batches of 50
const items = Array.from({ length: 1000 }, (_, i) => i);

await processInBatches(items, 50, async (batch) => {
  console.log(\`Processing batch of \${batch.length} items\`);
  // Send to API, process, etc.
  await fetch('/api/batch', {
    method: 'POST',
    body: JSON.stringify(batch),
  });
});`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Rate Limiting"}),e(n,{language:"typescript",code:`import { chunk } from 'fp-kit';

async function fetchWithRateLimit(
  urls: string[],
  maxConcurrent: number
): Promise<Response[]> {
  const batches = chunk(maxConcurrent, urls);
  const results: Response[] = [];

  for (const batch of batches) {
    // Process each batch concurrently
    const batchResults = await Promise.all(
      batch.map(url => fetch(url))
    );
    results.push(...batchResults);

    // Optional: delay between batches
    if (batches.indexOf(batch) < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}

// Fetch 100 URLs, 10 at a time
const urls = Array.from({ length: 100 }, (_, i) =>
  \`https://api.example.com/item/\${i}\`
);

const responses = await fetchWithRateLimit(urls, 10);`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Data Visualization"}),e(n,{language:"typescript",code:`import { chunk } from 'fp-kit';

// Group data points for averaging/smoothing
const temperatures = [
  72, 73, 71, 74, 75, 76, 74, 73,
  72, 71, 70, 69, 68, 67, 66, 65
];

// Average every 4 hours
const hourlyGroups = chunk(4, temperatures);
const averages = hourlyGroups.map(group =>
  group.reduce((sum, temp) => sum + temp, 0) / group.length
);

console.log(averages);
// [72.5, 74.75, 71.5, 66.5]

// Create histogram bins
function createHistogram(data: number[], binSize: number) {
  const sorted = [...data].sort((a, b) => a - b);
  const bins = chunk(binSize, sorted);

  return bins.map((bin, i) => ({
    range: \`\${bin[0]}-\${bin[bin.length - 1]}\`,
    count: bin.length,
    average: bin.reduce((sum, n) => sum + n, 0) / bin.length
  }));
}`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"With pipe"}),e(n,{language:"typescript",code:`import { pipe, chunk } from 'fp-kit';

const processData = pipe(
  (data: number[]) => data.filter(n => n > 0),
  (data: number[]) => chunk(5, data),
  (chunks: number[][]) => chunks.map(chunk => ({
    items: chunk,
    sum: chunk.reduce((a, b) => a + b, 0),
    avg: chunk.reduce((a, b) => a + b, 0) / chunk.length
  }))
);

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const result = processData(data);
// [
//   { items: [1, 2, 3, 4, 5], sum: 15, avg: 3 },
//   { items: [6, 7, 8, 9, 10], sum: 40, avg: 8 },
//   { items: [11, 12], sum: 23, avg: 11.5 }
// ]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Edge Cases"}),e(n,{language:"typescript",code:`import { chunk } from 'fp-kit';

// Empty array
chunk(3, []);
// []

// Size larger than array
chunk(10, [1, 2, 3]);
// [[1, 2, 3]]

// Size of 1
chunk(1, [1, 2, 3]);
// [[1], [2], [3]]

// Invalid sizes return empty array
chunk(0, [1, 2, 3]);      // []
chunk(-5, [1, 2, 3]);     // []
chunk(Infinity, [1, 2]);  // []
chunk(NaN, [1, 2]);       // []

// Decimal sizes are floored
chunk(2.7, [1, 2, 3, 4, 5]);
// [[1, 2], [3, 4], [5]]  (treated as size 2)`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Implementation Details"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"chunk uses array slicing to create chunks efficiently:"}),e(n,{language:"typescript",code:`function chunk<T>(size: number, arr: T[]): T[][] {
  const chunkSize = Math.floor(size);
  if (!Number.isFinite(chunkSize) || chunkSize <= 0) {
    return [];
  }

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:"The function floors the size and validates it before processing. Array.slice is used to create new arrays for each chunk, ensuring immutability."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/array/drop",onClick:t=>{t.preventDefault(),p("/array/drop")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"drop →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Learn about drop for removing the first n elements of an array."})]}),e("a",{href:"/array/groupBy",onClick:t=>{t.preventDefault(),p("/array/groupBy")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"groupBy →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Discover groupBy for grouping array elements by a key function."})]})]})]}),ni=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"chunk"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"배열을 지정된 크기로 분할"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"chunk란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"chunk"})," ","는 배열을 지정된 크기의 작은 배열(청크)로 나눕니다. 배열 길이가 청크 크기로 균등하게 나누어지지 않으면 마지막 청크는 더 적은 요소를 포함할 수 있습니다.",e("br",{}),e("br",{}),"이는 ",e("strong",{children:"페이지네이션"}),", ",e("strong",{children:"배치 처리"}),",",e("strong",{children:"그리드 레이아웃"}),", 그리고 ",e("strong",{children:"데이터를 그룹으로 분할"}),"하는 데 유용합니다."]}),e(n,{language:"typescript",code:`import { chunk } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

chunk(3, numbers);
// [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

chunk(4, numbers);
// [[1, 2, 3, 4], [5, 6, 7, 8], [9]]

chunk(2, numbers);
// [[1, 2], [3, 4], [5, 6], [7, 8], [9]]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"타입 시그니처"}),e(n,{language:"typescript",code:`function chunk<T>(size: number, arr: T[]): T[][];

// 청크 크기와 배열을 받음
// 청크 배열을 반환`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"크기는 자동으로 정수로 내림됩니다. 크기가 0, 음수 또는 유한하지 않으면 빈 배열이 반환됩니다."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"기본 사용법"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"간단한 예제"}),e(n,{language:"typescript",code:`import { chunk } from 'fp-kit';

// 쌍으로 분할
const pairs = chunk(2, [1, 2, 3, 4, 5, 6]);
// [[1, 2], [3, 4], [5, 6]]

// 3개씩 분할
const triplets = chunk(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']);
// [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]

// 마지막 청크는 더 작을 수 있음
const groups = chunk(5, [1, 2, 3, 4, 5, 6, 7]);
// [[1, 2, 3, 4, 5], [6, 7]]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예제"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"페이지네이션"}),e(n,{language:"typescript",code:`import { chunk } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 75 },
  { id: 4, name: 'Monitor', price: 300 },
  { id: 5, name: 'Headphones', price: 150 },
  { id: 6, name: 'Webcam', price: 80 },
  { id: 7, name: 'Microphone', price: 120 },
];

const ITEMS_PER_PAGE = 3;
const pages = chunk(ITEMS_PER_PAGE, products);

// 페이지 1: [{ id: 1, ... }, { id: 2, ... }, { id: 3, ... }]
// 페이지 2: [{ id: 4, ... }, { id: 5, ... }, { id: 6, ... }]
// 페이지 3: [{ id: 7, ... }]

function getPage(pageNumber: number) {
  return pages[pageNumber - 1] || [];
}

getPage(1); // 첫 3개 제품
getPage(2); // 다음 3개 제품
getPage(3); // 마지막 제품`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"그리드 레이아웃"}),e(n,{language:"typescript",code:`import { chunk } from 'fp-kit';

const images = [
  'img1.jpg', 'img2.jpg', 'img3.jpg',
  'img4.jpg', 'img5.jpg', 'img6.jpg',
  'img7.jpg', 'img8.jpg', 'img9.jpg',
  'img10.jpg'
];

const COLUMNS = 3;
const rows = chunk(COLUMNS, images);

// 그리드로 렌더링
rows.forEach(row => {
  console.log('행:', row);
});
// 행: ['img1.jpg', 'img2.jpg', 'img3.jpg']
// 행: ['img4.jpg', 'img5.jpg', 'img6.jpg']
// 행: ['img7.jpg', 'img8.jpg', 'img9.jpg']
// 행: ['img10.jpg']

// React에서
function ImageGrid({ images }: { images: string[] }) {
  const rows = chunk(3, images);

  return (
    <div>
      {rows.map((row, i) => (
        <div key={i} class="grid grid-cols-3 gap-4">
          {row.map((img, j) => (
            <img key={j} src={img} alt="" />
          ))}
        </div>
      ))}
    </div>
  );
}`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"배치 처리"}),e(n,{language:"typescript",code:`import { chunk } from 'fp-kit';

async function processInBatches<T>(
  items: T[],
  batchSize: number,
  processor: (batch: T[]) => Promise<void>
) {
  const batches = chunk(batchSize, items);

  for (const batch of batches) {
    await processor(batch);
  }
}

// 1000개 항목을 50개씩 배치로 처리
const items = Array.from({ length: 1000 }, (_, i) => i);

await processInBatches(items, 50, async (batch) => {
  console.log(\`\${batch.length}개 항목의 배치 처리 중\`);
  // API로 전송, 처리 등
  await fetch('/api/batch', {
    method: 'POST',
    body: JSON.stringify(batch),
  });
});`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"속도 제한"}),e(n,{language:"typescript",code:`import { chunk } from 'fp-kit';

async function fetchWithRateLimit(
  urls: string[],
  maxConcurrent: number
): Promise<Response[]> {
  const batches = chunk(maxConcurrent, urls);
  const results: Response[] = [];

  for (const batch of batches) {
    // 각 배치를 동시에 처리
    const batchResults = await Promise.all(
      batch.map(url => fetch(url))
    );
    results.push(...batchResults);

    // 선택사항: 배치 사이에 지연
    if (batches.indexOf(batch) < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}

// 100개 URL을 한 번에 10개씩 가져오기
const urls = Array.from({ length: 100 }, (_, i) =>
  \`https://api.example.com/item/\${i}\`
);

const responses = await fetchWithRateLimit(urls, 10);`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"데이터 시각화"}),e(n,{language:"typescript",code:`import { chunk } from 'fp-kit';

// 평균/스무딩을 위한 데이터 포인트 그룹화
const temperatures = [
  72, 73, 71, 74, 75, 76, 74, 73,
  72, 71, 70, 69, 68, 67, 66, 65
];

// 4시간마다 평균
const hourlyGroups = chunk(4, temperatures);
const averages = hourlyGroups.map(group =>
  group.reduce((sum, temp) => sum + temp, 0) / group.length
);

console.log(averages);
// [72.5, 74.75, 71.5, 66.5]

// 히스토그램 빈 생성
function createHistogram(data: number[], binSize: number) {
  const sorted = [...data].sort((a, b) => a - b);
  const bins = chunk(binSize, sorted);

  return bins.map((bin, i) => ({
    range: \`\${bin[0]}-\${bin[bin.length - 1]}\`,
    count: bin.length,
    average: bin.reduce((sum, n) => sum + n, 0) / bin.length
  }));
}`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"pipe와 함께"}),e(n,{language:"typescript",code:`import { pipe, chunk } from 'fp-kit';

const processData = pipe(
  (data: number[]) => data.filter(n => n > 0),
  (data: number[]) => chunk(5, data),
  (chunks: number[][]) => chunks.map(chunk => ({
    items: chunk,
    sum: chunk.reduce((a, b) => a + b, 0),
    avg: chunk.reduce((a, b) => a + b, 0) / chunk.length
  }))
);

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const result = processData(data);
// [
//   { items: [1, 2, 3, 4, 5], sum: 15, avg: 3 },
//   { items: [6, 7, 8, 9, 10], sum: 40, avg: 8 },
//   { items: [11, 12], sum: 23, avg: 11.5 }
// ]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"엣지 케이스"}),e(n,{language:"typescript",code:`import { chunk } from 'fp-kit';

// 빈 배열
chunk(3, []);
// []

// 배열보다 큰 크기
chunk(10, [1, 2, 3]);
// [[1, 2, 3]]

// 크기 1
chunk(1, [1, 2, 3]);
// [[1], [2], [3]]

// 유효하지 않은 크기는 빈 배열 반환
chunk(0, [1, 2, 3]);      // []
chunk(-5, [1, 2, 3]);     // []
chunk(Infinity, [1, 2]);  // []
chunk(NaN, [1, 2]);       // []

// 소수 크기는 내림됨
chunk(2.7, [1, 2, 3, 4, 5]);
// [[1, 2], [3, 4], [5]]  (크기 2로 처리됨)`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"구현 세부 사항"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"chunk는 배열 슬라이싱을 사용하여 효율적으로 청크를 생성합니다:"}),e(n,{language:"typescript",code:`function chunk<T>(size: number, arr: T[]): T[][] {
  const chunkSize = Math.floor(size);
  if (!Number.isFinite(chunkSize) || chunkSize <= 0) {
    return [];
  }

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:"함수는 크기를 내림하고 처리 전에 검증합니다. Array.slice를 사용하여 각 청크에 대해 새로운 배열을 생성하여 불변성을 보장합니다."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/array/drop",onClick:t=>{t.preventDefault(),p("/array/drop")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"drop →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"배열의 앞 n개 요소를 제외하는 drop에 대해 알아보세요."})]}),e("a",{href:"/array/groupBy",onClick:t=>{t.preventDefault(),p("/array/groupBy")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"groupBy →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"키 함수로 배열 요소를 그룹화하는 groupBy를 알아보세요."})]})]})]}),ii=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"drop"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Remove the first n elements from an array"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is drop?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"drop"})," ","removes the first n elements from an array and returns a new array containing the remaining elements. If n is greater than the array length, it returns an empty array. If n is 0 or negative, it returns the original array unchanged.",e("br",{}),e("br",{}),"This is useful for ",e("strong",{children:"skipping items"}),", ",e("strong",{children:"pagination"}),",",e("strong",{children:"removing headers"}),", and ",e("strong",{children:"stream processing"}),"."]}),e(n,{language:"typescript",code:`import { drop } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5, 6];

drop(2, numbers);
// [3, 4, 5, 6]

drop(4, numbers);
// [5, 6]

drop(10, numbers);
// []  (exceeds length)

drop(0, numbers);
// [1, 2, 3, 4, 5, 6]  (unchanged)`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Type Signature"}),e(n,{language:"typescript",code:`function drop<T>(n: number, arr: T[]): T[];

// Takes a count of elements to drop and an array
// Returns the array without the first n elements`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"The count is automatically floored to an integer. If n is 0, negative, or not finite, the original array is returned unchanged."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Basic Usage"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Simple Examples"}),e(n,{language:"typescript",code:`import { drop } from 'fp-kit';

// Drop first 3 elements
const skipThree = drop(3, [1, 2, 3, 4, 5, 6, 7]);
// [4, 5, 6, 7]

// Drop first element
const tail = drop(1, ['a', 'b', 'c', 'd']);
// ['b', 'c', 'd']

// Drop more than length
const tooMany = drop(10, [1, 2, 3]);
// []

// Drop nothing
const none = drop(0, [1, 2, 3]);
// [1, 2, 3]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Practical Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Pagination - Skip Previous Pages"}),e(n,{language:"typescript",code:`import { drop } from 'fp-kit';
import { chunk } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  price: number;
}

const allProducts: Product[] = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 75 },
  { id: 4, name: 'Monitor', price: 300 },
  { id: 5, name: 'Headphones', price: 150 },
  { id: 6, name: 'Webcam', price: 80 },
  { id: 7, name: 'Microphone', price: 120 },
  { id: 8, name: 'Speaker', price: 90 },
];

const ITEMS_PER_PAGE = 3;
const currentPage = 2; // 0-indexed

// Skip items from previous pages
const offset = currentPage * ITEMS_PER_PAGE;
const remainingItems = drop(offset, allProducts);
const currentPageItems = remainingItems.slice(0, ITEMS_PER_PAGE);

console.log(currentPageItems);
// [{ id: 7, name: 'Microphone', ... }, { id: 8, name: 'Speaker', ... }]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"CSV Processing - Remove Header Row"}),e(n,{language:"typescript",code:`import { drop } from 'fp-kit';

const csvLines = [
  'Name,Age,City',        // Header row
  'Alice,30,New York',
  'Bob,25,Los Angeles',
  'Charlie,35,Chicago',
];

// Remove header row
const dataRows = drop(1, csvLines);
// ['Alice,30,New York', 'Bob,25,Los Angeles', 'Charlie,35,Chicago']

// Parse data rows
const users = dataRows.map(line => {
  const [name, age, city] = line.split(',');
  return { name, age: parseInt(age), city };
});

console.log(users);
// [
//   { name: 'Alice', age: 30, city: 'New York' },
//   { name: 'Bob', age: 25, city: 'Los Angeles' },
//   { name: 'Charlie', age: 35, city: 'Chicago' }
// ]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Array Processing - Skip Initial Elements"}),e(n,{language:"typescript",code:`import { drop } from 'fp-kit';
import { pipe } from 'fp-kit';

// Process array by dropping warm-up samples
const sensorReadings = [12, 15, 18, 100, 102, 98, 101, 99, 103];

const WARMUP_SAMPLES = 3;

const processReadings = pipe(
  (readings) => drop(WARMUP_SAMPLES, readings),
  (readings) => readings.reduce((a, b) => a + b, 0) / readings.length
);

const averageReading = processReadings(sensorReadings);
// 100.5 (average of [100, 102, 98, 101, 99, 103])`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Breadcrumb Navigation"}),e(n,{language:"typescript",code:`import { drop } from 'fp-kit';

const fullPath = ['Home', 'Products', 'Electronics', 'Laptops', 'Gaming'];

// Get sub-path from a certain level
const fromProducts = drop(1, fullPath);
// ['Products', 'Electronics', 'Laptops', 'Gaming']

const fromElectronics = drop(2, fullPath);
// ['Electronics', 'Laptops', 'Gaming']

// Build breadcrumb link
const buildBreadcrumb = (pathSegments: string[], dropCount: number) => {
  return drop(dropCount, pathSegments).join(' > ');
};

console.log(buildBreadcrumb(fullPath, 0));
// 'Home > Products > Electronics > Laptops > Gaming'

console.log(buildBreadcrumb(fullPath, 2));
// 'Electronics > Laptops > Gaming'`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Common Patterns"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"With pipe for Data Processing"}),e(n,{language:"typescript",code:`import { pipe, drop } from 'fp-kit';

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const result = pipe(
  (arr) => drop(3, arr),                  // Skip first 3
  (arr) => arr.filter(x => x % 2 === 0),  // Keep evens
  (arr) => arr.map(x => x * 2)            // Double them
)(data);

// [6, 8, 10, 12, 14, 16, 18]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Sliding Window Processing"}),e(n,{language:"typescript",code:`import { drop } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// Process with sliding window of size 3
const WINDOW_SIZE = 3;

for (let i = 0; i <= numbers.length - WINDOW_SIZE; i++) {
  const window = drop(i, numbers).slice(0, WINDOW_SIZE);
  console.log(\`Window \${i + 1}:\`, window);
}

// Window 1: [1, 2, 3]
// Window 2: [2, 3, 4]
// Window 3: [3, 4, 5]
// Window 4: [4, 5, 6]
// Window 5: [5, 6, 7]
// Window 6: [6, 7, 8]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Why Use drop?"}),e("div",{class:"space-y-6",children:[e("div",{children:[e("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:"1. Declarative Array Slicing"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:'Express your intent clearly: "drop 3 items" is more readable than array.slice(3).'})]}),e("div",{children:[e("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:"2. Composable with Other Functions"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:"Works seamlessly with pipe, compose, and other functional utilities for powerful data transformations."})]}),e("div",{children:[e("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:"3. Safe Edge Case Handling"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:"Automatically handles edge cases: negative numbers, exceeding array length, non-finite values."})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Implementation Details"}),e(n,{language:"typescript",code:`function drop<T>(n: number, arr: T[]): T[] {
  const count = Math.floor(n);
  if (!Number.isFinite(count) || count <= 0) {
    return arr;
  }
  return arr.slice(count);
}`}),e("div",{class:"mt-6 space-y-4",children:[e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:e("strong",{children:"How it works:"})}),e("ol",{class:"list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300",children:[e("li",{children:"Floors the count to ensure it's an integer"}),e("li",{children:"Returns the original array if count is not finite or is 0 or negative"}),e("li",{children:"Uses Array.slice(count) to efficiently remove the first n elements"}),e("li",{children:"Returns a new array without mutating the original"})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"space-y-4",children:[e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:"Try these related array functions:"}),e("ul",{class:"list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300",children:[e("li",{children:[e("a",{onClick:t=>{t.preventDefault(),p("/array/filter")},class:"text-blue-600 dark:text-blue-400 hover:underline cursor-pointer",children:"filter"})," ","- Keep only the elements that match a predicate"]}),e("li",{children:[e("a",{onClick:t=>{t.preventDefault(),p("/array/chunk")},class:"text-blue-600 dark:text-blue-400 hover:underline cursor-pointer",children:"chunk"})," ","- Split array into chunks"]}),e("li",{children:[e("a",{onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"text-blue-600 dark:text-blue-400 hover:underline cursor-pointer",children:"pipe"})," ","- Chain drop with other transformations"]})]})]})]}),si=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"drop"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"배열의 앞에서 n개의 요소 제거"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"drop이란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"drop"})," ","은 배열의 앞에서 n개의 요소를 제거하고 나머지 요소들을 포함하는 새 배열을 반환합니다. n이 배열 길이보다 크면 빈 배열을 반환합니다. n이 0 이하이면 원본 배열을 변경 없이 반환합니다.",e("br",{}),e("br",{}),"이는 ",e("strong",{children:"항목 건너뛰기"}),", ",e("strong",{children:"페이지네이션"}),",",e("strong",{children:"헤더 제거"}),", 그리고 ",e("strong",{children:"스트림 처리"}),"에 유용합니다."]}),e(n,{language:"typescript",code:`import { drop } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5, 6];

drop(2, numbers);
// [3, 4, 5, 6]

drop(4, numbers);
// [5, 6]

drop(10, numbers);
// []  (길이 초과)

drop(0, numbers);
// [1, 2, 3, 4, 5, 6]  (변경 없음)`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"타입 시그니처"}),e(n,{language:"typescript",code:`function drop<T>(n: number, arr: T[]): T[];

// 제거할 요소의 개수와 배열을 받음
// 앞의 n개 요소를 제거한 배열을 반환`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"개수는 자동으로 정수로 내림됩니다. n이 0, 음수, 또는 유한하지 않으면 원본 배열이 변경 없이 반환됩니다."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"기본 사용법"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"간단한 예시"}),e(n,{language:"typescript",code:`import { drop } from 'fp-kit';

// 첫 3개 요소 제거
const skipThree = drop(3, [1, 2, 3, 4, 5, 6, 7]);
// [4, 5, 6, 7]

// 첫 번째 요소 제거
const tail = drop(1, ['a', 'b', 'c', 'd']);
// ['b', 'c', 'd']

// 길이보다 많이 제거
const tooMany = drop(10, [1, 2, 3]);
// []

// 아무것도 제거하지 않음
const none = drop(0, [1, 2, 3]);
// [1, 2, 3]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예시"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"페이지네이션 - 이전 페이지 건너뛰기"}),e(n,{language:"typescript",code:`import { drop } from 'fp-kit';
import { chunk } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  price: number;
}

const allProducts: Product[] = [
  { id: 1, name: '노트북', price: 1000 },
  { id: 2, name: '마우스', price: 25 },
  { id: 3, name: '키보드', price: 75 },
  { id: 4, name: '모니터', price: 300 },
  { id: 5, name: '헤드폰', price: 150 },
  { id: 6, name: '웹캠', price: 80 },
  { id: 7, name: '마이크', price: 120 },
  { id: 8, name: '스피커', price: 90 },
];

const ITEMS_PER_PAGE = 3;
const currentPage = 2; // 0-based index

// 이전 페이지의 항목들 건너뛰기
const offset = currentPage * ITEMS_PER_PAGE;
const remainingItems = drop(offset, allProducts);
const currentPageItems = remainingItems.slice(0, ITEMS_PER_PAGE);

console.log(currentPageItems);
// [{ id: 7, name: '마이크', ... }, { id: 8, name: '스피커', ... }]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"CSV 처리 - 헤더 행 제거"}),e(n,{language:"typescript",code:`import { drop } from 'fp-kit';

const csvLines = [
  '이름,나이,도시',        // 헤더 행
  'Alice,30,서울',
  'Bob,25,부산',
  'Charlie,35,대구',
];

// 헤더 행 제거
const dataRows = drop(1, csvLines);
// ['Alice,30,서울', 'Bob,25,부산', 'Charlie,35,대구']

// 데이터 행 파싱
const users = dataRows.map(line => {
  const [name, age, city] = line.split(',');
  return { name, age: parseInt(age), city };
});

console.log(users);
// [
//   { name: 'Alice', age: 30, city: '서울' },
//   { name: 'Bob', age: 25, city: '부산' },
//   { name: 'Charlie', age: 35, city: '대구' }
// ]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"배열 처리 - 초기 요소 건너뛰기"}),e(n,{language:"typescript",code:`import { drop } from 'fp-kit';
import { pipe } from 'fp-kit';

// 워밍업 샘플을 제거하여 배열 처리
const sensorReadings = [12, 15, 18, 100, 102, 98, 101, 99, 103];

const WARMUP_SAMPLES = 3;

const processReadings = pipe(
  (readings) => drop(WARMUP_SAMPLES, readings),
  (readings) => readings.reduce((a, b) => a + b, 0) / readings.length
);

const averageReading = processReadings(sensorReadings);
// 100.5 ([100, 102, 98, 101, 99, 103]의 평균)`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"브레드크럼 네비게이션"}),e(n,{language:"typescript",code:`import { drop } from 'fp-kit';

const fullPath = ['홈', '제품', '전자기기', '노트북', '게이밍'];

// 특정 레벨부터 하위 경로 가져오기
const fromProducts = drop(1, fullPath);
// ['제품', '전자기기', '노트북', '게이밍']

const fromElectronics = drop(2, fullPath);
// ['전자기기', '노트북', '게이밍']

// 브레드크럼 링크 생성
const buildBreadcrumb = (pathSegments: string[], dropCount: number) => {
  return drop(dropCount, pathSegments).join(' > ');
};

console.log(buildBreadcrumb(fullPath, 0));
// '홈 > 제품 > 전자기기 > 노트북 > 게이밍'

console.log(buildBreadcrumb(fullPath, 2));
// '전자기기 > 노트북 > 게이밍'`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"일반적인 패턴"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"데이터 처리를 위한 pipe와 함께 사용"}),e(n,{language:"typescript",code:`import { pipe, drop } from 'fp-kit';

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const result = pipe(
  (arr) => drop(3, arr),                  // 첫 3개 건너뛰기
  (arr) => arr.filter(x => x % 2 === 0),  // 짝수만 유지
  (arr) => arr.map(x => x * 2)            // 2배로 만들기
)(data);

// [6, 8, 10, 12, 14, 16, 18]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"슬라이딩 윈도우 처리"}),e(n,{language:"typescript",code:`import { drop } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// 크기 3의 슬라이딩 윈도우로 처리
const WINDOW_SIZE = 3;

for (let i = 0; i <= numbers.length - WINDOW_SIZE; i++) {
  const window = drop(i, numbers).slice(0, WINDOW_SIZE);
  console.log(\`윈도우 \${i + 1}:\`, window);
}

// 윈도우 1: [1, 2, 3]
// 윈도우 2: [2, 3, 4]
// 윈도우 3: [3, 4, 5]
// 윈도우 4: [4, 5, 6]
// 윈도우 5: [5, 6, 7]
// 윈도우 6: [6, 7, 8]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"왜 drop을 사용하나요?"}),e("div",{class:"space-y-6",children:[e("div",{children:[e("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:"1. 선언적 배열 슬라이싱"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:'의도를 명확하게 표현: "3개 제거"는 array.slice(3)보다 읽기 쉽습니다.'})]}),e("div",{children:[e("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:"2. 다른 함수와 조합 가능"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:"pipe, compose 및 다른 함수형 유틸리티와 완벽하게 작동하여 강력한 데이터 변환이 가능합니다."})]}),e("div",{children:[e("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:"3. 안전한 엣지 케이스 처리"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:"음수, 배열 길이 초과, 유한하지 않은 값 등의 엣지 케이스를 자동으로 처리합니다."})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"구현 세부사항"}),e(n,{language:"typescript",code:`function drop<T>(n: number, arr: T[]): T[] {
  const count = Math.floor(n);
  if (!Number.isFinite(count) || count <= 0) {
    return arr;
  }
  return arr.slice(count);
}`}),e("div",{class:"mt-6 space-y-4",children:[e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:e("strong",{children:"작동 방식:"})}),e("ol",{class:"list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300",children:[e("li",{children:"count를 내림하여 정수로 만듭니다"}),e("li",{children:"count가 유한하지 않거나 0 이하이면 원본 배열을 반환합니다"}),e("li",{children:"Array.slice(count)를 사용하여 효율적으로 첫 n개 요소를 제거합니다"}),e("li",{children:"원본을 변경하지 않고 새 배열을 반환합니다"})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"space-y-4",children:[e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:"관련된 배열 함수들을 시도해보세요:"}),e("ul",{class:"list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300",children:[e("li",{children:[e("a",{onClick:t=>{t.preventDefault(),p("/array/filter")},class:"text-blue-600 dark:text-blue-400 hover:underline cursor-pointer",children:"filter"})," ","- 조건을 만족하는 요소만 남기기"]}),e("li",{children:[e("a",{onClick:t=>{t.preventDefault(),p("/array/chunk")},class:"text-blue-600 dark:text-blue-400 hover:underline cursor-pointer",children:"chunk"})," ","- 배열을 청크로 분할"]}),e("li",{children:[e("a",{onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"text-blue-600 dark:text-blue-400 hover:underline cursor-pointer",children:"pipe"})," ","- drop을 다른 변환과 연결"]})]})]})]}),oi=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"every"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Check if all elements satisfy a condition"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is every?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"every"})," ","tests whether all elements in an array satisfy a provided predicate function. It returns ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"true"})," if every element passes the test, and ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"false"})," if any element fails. For empty arrays, it returns ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"true"})," (vacuous truth).",e("br",{}),e("br",{}),"This is useful for ",e("strong",{children:"validation"}),", ",e("strong",{children:"type checking"}),",",e("strong",{children:"data verification"}),", and ",e("strong",{children:"ensuring constraints"}),"."]}),e(n,{language:"typescript",code:`import { every } from 'fp-kit';

const numbers = [2, 4, 6, 8, 10];

every((n: number) => n % 2 === 0, numbers);
// true (all are even)

every((n: number) => n > 5, numbers);
// false (not all are greater than 5)

const allPositive = (arr: number[]) => every((n: number) => n > 0, arr);
allPositive([1, 2, 3]);    // true
allPositive([1, -2, 3]);   // false`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Type Signature"}),e(n,{language:"typescript",code:`function every<T>(
  predicate: (value: T) => boolean,
  arr: T[]
): boolean;

// Takes a predicate function and an array
// Returns true if all elements satisfy the predicate`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"The predicate is called for each element until one returns false, or all elements have been tested. Returns true for empty arrays (vacuous truth)."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Basic Usage"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Simple Checks"}),e(n,{language:"typescript",code:`import { every } from 'fp-kit';

// Check if all numbers are positive
const allPositive = every((n: number) => n > 0, [1, 2, 3, 4]);
// true

// Check if all strings are non-empty
const allNonEmpty = every((s: string) => s.length > 0, ['a', 'b', 'c']);
// true

// Check if all numbers are even
const allEven = every((n: number) => n % 2 === 0, [2, 4, 6, 8]);
// true

// Empty array returns true
const empty = every((n: number) => n > 100, []);
// true`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Practical Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Form Validation"}),e(n,{language:"typescript",code:`import { every } from 'fp-kit';

interface FormField {
  name: string;
  value: string;
  required: boolean;
}

const formFields: FormField[] = [
  { name: 'username', value: 'john_doe', required: true },
  { name: 'email', value: 'john@example.com', required: true },
  { name: 'phone', value: '123-456-7890', required: false },
];

// Check if all required fields are filled
const isFormValid = every(
  (field: FormField) => !field.required || field.value.length > 0,
  formFields
);
// true

// Validate email format in all email fields
const emailFields = formFields.filter(f => f.name.includes('email'));
const allValidEmails = every(
  (field: FormField) => field.value.includes('@') && field.value.includes('.'),
  emailFields
);

console.log(allValidEmails);
// true`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Data Consistency Check"}),e(n,{language:"typescript",code:`import { every } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1000, inStock: true },
  { id: 2, name: 'Mouse', price: 25, inStock: true },
  { id: 3, name: 'Keyboard', price: 75, inStock: true },
];

// Verify all products have valid prices
const allValidPrices = every((p: Product) => p.price > 0 && Number.isFinite(p.price), products);

console.log(allValidPrices);
// true

// Check if all products are in stock
const allInStock = every((p: Product) => p.inStock, products);

console.log(allInStock);
// true

// Verify all products have unique IDs
const hasUniqueIds = (products: Product[]) => {
  const ids = products.map(p => p.id);
  return ids.length === new Set(ids).size;
};

console.log(hasUniqueIds(products));
// true`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Permission Checking"}),e(n,{language:"typescript",code:`import { every } from 'fp-kit';

interface User {
  id: number;
  role: 'admin' | 'editor' | 'viewer';
  permissions: string[];
}

const users: User[] = [
  { id: 1, role: 'admin', permissions: ['read', 'write', 'delete'] },
  { id: 2, role: 'editor', permissions: ['read', 'write'] },
  { id: 3, role: 'viewer', permissions: ['read'] },
];

// Check if all users have read permission
const allCanRead = every((u: User) => u.permissions.includes('read'), users);

console.log(allCanRead);
// true

// Check if all users can write
const allCanWrite = every((u: User) => u.permissions.includes('write'), users);

console.log(allCanWrite);
// false

// Verify all admins have full permissions
const admins = users.filter(u => u.role === 'admin');
const allAdminsHaveFullAccess = every(
  (u: User) => u.permissions.includes('delete'),
  admins
);

console.log(allAdminsHaveFullAccess);
// true`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Type Guard with every"}),e(n,{language:"typescript",code:`import { every } from 'fp-kit';

// Check if all values are strings
const allStrings = (arr: unknown[]): arr is string[] =>
  every((value: unknown): value is string => typeof value === 'string', arr);

const mixedArray: unknown[] = ['a', 'b', 'c'];
if (allStrings(mixedArray)) {
  // TypeScript now knows mixedArray contains only strings
  mixedArray.forEach(s => console.log(s.toUpperCase()));
}

// Check if all values are numbers
const allNumbers = (arr: unknown[]): arr is number[] =>
  every((value: unknown): value is number => typeof value === 'number' && !isNaN(value), arr);

const data: unknown[] = [1, 2, 3, 4];
if (allNumbers(data)) {
  const sum = data.reduce((a, b) => a + b, 0);
  console.log(sum); // 10
}`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Common Patterns"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Combining with pipe"}),e(n,{language:"typescript",code:`import { pipe, every } from 'fp-kit';

interface Task {
  id: number;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

const tasks: Task[] = [
  { id: 1, completed: true, priority: 'high' },
  { id: 2, completed: true, priority: 'medium' },
  { id: 3, completed: false, priority: 'low' },
];

// Check if all high priority tasks are completed
const allHighPriorityDone = pipe(
  (tasks: Task[]) => tasks.filter(t => t.priority === 'high'),
  (highPriorityTasks: Task[]) => every((t: Task) => t.completed, highPriorityTasks)
);

console.log(allHighPriorityDone(tasks));
// true`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Validating Nested Data"}),e(n,{language:"typescript",code:`import { every } from 'fp-kit';

interface Order {
  items: { price: number; quantity: number }[];
  customer: { email: string; verified: boolean };
}

const orders: Order[] = [
  {
    items: [{ price: 10, quantity: 2 }, { price: 20, quantity: 1 }],
    customer: { email: 'user1@example.com', verified: true }
  },
  {
    items: [{ price: 15, quantity: 3 }],
    customer: { email: 'user2@example.com', verified: true }
  },
];

// Check if all orders are from verified customers
const allFromVerified = every((o: Order) => o.customer.verified, orders);

console.log(allFromVerified);
// true

// Check if all orders have valid items
const allHaveValidItems = every((o: Order) =>
  o.items.length > 0 && o.items.every(item => item.price > 0 && item.quantity > 0),
  orders
);

console.log(allHaveValidItems);
// true`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Array of Promises Validation"}),e(n,{language:"typescript",code:`import { every } from 'fp-kit';

// Check if all promises are settled
const allSettled = async (promises: Promise<any>[]) => {
  const results = await Promise.allSettled(promises);
  return every((r: PromiseSettledResult<any>) => r.status === 'fulfilled', results);
};

// Usage
const promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
];

allSettled(promises).then(result => {
  console.log(result); // true
});

// Check if all values are truthy after resolution
const allTruthy = async (promises: Promise<any>[]) => {
  const values = await Promise.all(promises);
  return every((v: any) => Boolean(v), values);
};`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Why Use every?"}),e("div",{class:"space-y-6",children:[e("div",{children:[e("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:"1. Declarative Validation"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:'Express validation logic clearly: "all users are adults" is more readable than manual loops.'})]}),e("div",{children:[e("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:"2. Simple and Direct"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:"Straightforward function signature makes it easy to understand and use without additional cognitive overhead."})]}),e("div",{children:[e("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:"3. Short-Circuit Evaluation"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:"Stops checking as soon as a false condition is found, improving performance on large arrays."})]}),e("div",{children:[e("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:"4. Composable with Functional Patterns"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:"Works seamlessly with pipe, compose, and other functional utilities for complex validation pipelines."})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Implementation Details"}),e(n,{language:"typescript",code:`function every<T>(predicate: (value: T) => boolean, arr: T[]): boolean {
  return arr.every(predicate);
}`}),e("div",{class:"mt-6 space-y-4",children:[e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:e("strong",{children:"How it works:"})}),e("ol",{class:"list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300",children:[e("li",{children:"Takes a predicate function that tests each element and an array"}),e("li",{children:"Uses native Array.prototype.every for optimal performance"}),e("li",{children:"Short-circuits on first false result"}),e("li",{children:"Returns true for empty arrays (vacuous truth)"})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"space-y-4",children:[e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:"Try these related array functions:"}),e("ul",{class:"list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300",children:[e("li",{children:[e("a",{onClick:t=>{t.preventDefault(),p("/array/find")},class:"text-blue-600 dark:text-blue-400 hover:underline cursor-pointer",children:"find"})," ","- Get the first element that matches a predicate"]}),e("li",{children:[e("a",{onClick:t=>{t.preventDefault(),p("/array/filter")},class:"text-blue-600 dark:text-blue-400 hover:underline cursor-pointer",children:"filter"})," ","- Filter elements that satisfy a condition"]}),e("li",{children:[e("a",{onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"text-blue-600 dark:text-blue-400 hover:underline cursor-pointer",children:"pipe"})," ","- Chain every with other transformations"]})]})]})]}),li=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"every"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"모든 요소가 조건을 만족하는지 확인"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"every란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"every"})," ","는 배열의 모든 요소가 제공된 조건 함수를 만족하는지 테스트합니다. 모든 요소가 테스트를 통과하면 ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"true"}),"를, 어떤 요소라도 실패하면 ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"false"}),"를 반환합니다. 빈 배열의 경우 ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"true"}),"를 반환합니다 (공허한 참).",e("br",{}),e("br",{}),"이는 ",e("strong",{children:"유효성 검사"}),", ",e("strong",{children:"타입 체크"}),",",e("strong",{children:"데이터 검증"}),", 그리고 ",e("strong",{children:"제약 조건 확인"}),"에 유용합니다."]}),e(n,{language:"typescript",code:`import { every } from 'fp-kit';

const numbers = [2, 4, 6, 8, 10];

every((n: number) => n % 2 === 0, numbers);
// true (모두 짝수)

every((n: number) => n > 5, numbers);
// false (모두 5보다 크지 않음)

const allPositive = (arr: number[]) => every((n: number) => n > 0, arr);
allPositive([1, 2, 3]);    // true
allPositive([1, -2, 3]);   // false`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"타입 시그니처"}),e(n,{language:"typescript",code:`function every<T>(
  predicate: (value: T) => boolean,
  arr: T[]
): boolean;

// 조건 함수와 배열을 받음
// 모든 요소가 조건을 만족하면 true를 반환`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"조건 함수는 하나가 false를 반환하거나 모든 요소가 테스트될 때까지 각 요소에 대해 호출됩니다. 빈 배열에 대해서는 true를 반환합니다 (공허한 참)."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"기본 사용법"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"간단한 체크"}),e(n,{language:"typescript",code:`import { every } from 'fp-kit';

// 모든 숫자가 양수인지 확인
const allPositive = every((n: number) => n > 0, [1, 2, 3, 4]);
// true

// 모든 문자열이 비어있지 않은지 확인
const allNonEmpty = every((s: string) => s.length > 0, ['a', 'b', 'c']);
// true

// 모든 숫자가 짝수인지 확인
const allEven = every((n: number) => n % 2 === 0, [2, 4, 6, 8]);
// true

// 빈 배열은 true를 반환
const empty = every((n: number) => n > 100, []);
// true`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예시"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"폼 유효성 검사"}),e(n,{language:"typescript",code:`import { every } from 'fp-kit';

interface FormField {
  name: string;
  value: string;
  required: boolean;
}

const formFields: FormField[] = [
  { name: 'username', value: 'john_doe', required: true },
  { name: 'email', value: 'john@example.com', required: true },
  { name: 'phone', value: '123-456-7890', required: false },
];

// 모든 필수 필드가 채워졌는지 확인
const isFormValid = every(
  (field: FormField) => !field.required || field.value.length > 0,
  formFields
);
// true

// 모든 이메일 필드의 형식 검증
const emailFields = formFields.filter(f => f.name.includes('email'));
const allValidEmails = every(
  (field: FormField) => field.value.includes('@') && field.value.includes('.'),
  emailFields
);

console.log(allValidEmails);
// true`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"데이터 일관성 체크"}),e(n,{language:"typescript",code:`import { every } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: 1, name: '노트북', price: 1000, inStock: true },
  { id: 2, name: '마우스', price: 25, inStock: true },
  { id: 3, name: '키보드', price: 75, inStock: true },
];

// 모든 제품이 유효한 가격을 가지는지 확인
const allValidPrices = every((p: Product) => p.price > 0 && Number.isFinite(p.price), products);

console.log(allValidPrices);
// true

// 모든 제품이 재고가 있는지 확인
const allInStock = every((p: Product) => p.inStock, products);

console.log(allInStock);
// true

// 모든 제품이 고유한 ID를 가지는지 확인
const hasUniqueIds = (products: Product[]) => {
  const ids = products.map(p => p.id);
  return ids.length === new Set(ids).size;
};

console.log(hasUniqueIds(products));
// true`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"권한 확인"}),e(n,{language:"typescript",code:`import { every } from 'fp-kit';

interface User {
  id: number;
  role: 'admin' | 'editor' | 'viewer';
  permissions: string[];
}

const users: User[] = [
  { id: 1, role: 'admin', permissions: ['read', 'write', 'delete'] },
  { id: 2, role: 'editor', permissions: ['read', 'write'] },
  { id: 3, role: 'viewer', permissions: ['read'] },
];

// 모든 사용자가 읽기 권한이 있는지 확인
const allCanRead = every((u: User) => u.permissions.includes('read'), users);

console.log(allCanRead);
// true

// 모든 사용자가 쓰기 권한이 있는지 확인
const allCanWrite = every((u: User) => u.permissions.includes('write'), users);

console.log(allCanWrite);
// false

// 모든 관리자가 전체 권한을 가지는지 확인
const admins = users.filter(u => u.role === 'admin');
const allAdminsHaveFullAccess = every(
  (u: User) => u.permissions.includes('delete'),
  admins
);

console.log(allAdminsHaveFullAccess);
// true`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"타입 가드와 함께 사용"}),e(n,{language:"typescript",code:`import { every } from 'fp-kit';

// 모든 값이 문자열인지 확인
const allStrings = (arr: unknown[]): arr is string[] =>
  every((value: unknown): value is string => typeof value === 'string', arr);

const mixedArray: unknown[] = ['a', 'b', 'c'];
if (allStrings(mixedArray)) {
  // TypeScript는 이제 mixedArray가 문자열만 포함한다는 것을 알고 있습니다
  mixedArray.forEach(s => console.log(s.toUpperCase()));
}

// 모든 값이 숫자인지 확인
const allNumbers = (arr: unknown[]): arr is number[] =>
  every((value: unknown): value is number => typeof value === 'number' && !isNaN(value), arr);

const data: unknown[] = [1, 2, 3, 4];
if (allNumbers(data)) {
  const sum = data.reduce((a, b) => a + b, 0);
  console.log(sum); // 10
}`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"일반적인 패턴"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"pipe와 조합"}),e(n,{language:"typescript",code:`import { pipe, every } from 'fp-kit';

interface Task {
  id: number;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

const tasks: Task[] = [
  { id: 1, completed: true, priority: 'high' },
  { id: 2, completed: true, priority: 'medium' },
  { id: 3, completed: false, priority: 'low' },
];

// 모든 높은 우선순위 작업이 완료되었는지 확인
const allHighPriorityDone = pipe(
  (tasks: Task[]) => tasks.filter(t => t.priority === 'high'),
  (highPriorityTasks: Task[]) => every((t: Task) => t.completed, highPriorityTasks)
);

console.log(allHighPriorityDone(tasks));
// true`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"중첩된 데이터 검증"}),e(n,{language:"typescript",code:`import { every } from 'fp-kit';

interface Order {
  items: { price: number; quantity: number }[];
  customer: { email: string; verified: boolean };
}

const orders: Order[] = [
  {
    items: [{ price: 10, quantity: 2 }, { price: 20, quantity: 1 }],
    customer: { email: 'user1@example.com', verified: true }
  },
  {
    items: [{ price: 15, quantity: 3 }],
    customer: { email: 'user2@example.com', verified: true }
  },
];

// 모든 주문이 인증된 고객으로부터 온 것인지 확인
const allFromVerified = every((o: Order) => o.customer.verified, orders);

console.log(allFromVerified);
// true

// 모든 주문이 유효한 항목을 가지는지 확인
const allHaveValidItems = every((o: Order) =>
  o.items.length > 0 && o.items.every(item => item.price > 0 && item.quantity > 0),
  orders
);

console.log(allHaveValidItems);
// true`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Promise 배열 검증"}),e(n,{language:"typescript",code:`import { every } from 'fp-kit';

// 모든 promise가 완료되었는지 확인
const allSettled = async (promises: Promise<any>[]) => {
  const results = await Promise.allSettled(promises);
  return every((r: PromiseSettledResult<any>) => r.status === 'fulfilled', results);
};

// 사용법
const promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
];

allSettled(promises).then(result => {
  console.log(result); // true
});

// 모든 값이 해결 후 truthy인지 확인
const allTruthy = async (promises: Promise<any>[]) => {
  const values = await Promise.all(promises);
  return every((v: any) => Boolean(v), values);
};`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"왜 every를 사용하나요?"}),e("div",{class:"space-y-6",children:[e("div",{children:[e("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:"1. 선언적 유효성 검사"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:'검증 로직을 명확하게 표현: "모든 사용자가 성인"이 수동 루프보다 읽기 쉽습니다.'})]}),e("div",{children:[e("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:"2. 간단하고 직관적"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:"직관적인 함수 시그니처로 추가적인 인지 부담 없이 쉽게 이해하고 사용할 수 있습니다."})]}),e("div",{children:[e("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:"3. 단락 평가"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:"거짓 조건을 찾는 즉시 검사를 중단하여 큰 배열에서 성능을 향상시킵니다."})]}),e("div",{children:[e("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:"4. 함수형 패턴과 조합 가능"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:"pipe, compose 및 다른 함수형 유틸리티와 완벽하게 작동하여 복잡한 검증 파이프라인을 만들 수 있습니다."})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"구현 세부사항"}),e(n,{language:"typescript",code:`function every<T>(predicate: (value: T) => boolean, arr: T[]): boolean {
  return arr.every(predicate);
}`}),e("div",{class:"mt-6 space-y-4",children:[e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:e("strong",{children:"작동 방식:"})}),e("ol",{class:"list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300",children:[e("li",{children:"각 요소를 테스트하는 조건 함수와 배열을 받습니다"}),e("li",{children:"최적의 성능을 위해 네이티브 Array.prototype.every를 사용합니다"}),e("li",{children:"첫 번째 false 결과에서 단락됩니다"}),e("li",{children:"빈 배열에 대해 true를 반환합니다 (공허한 참)"})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"space-y-4",children:[e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed",children:"관련된 배열 함수들을 시도해보세요:"}),e("ul",{class:"list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300",children:[e("li",{children:[e("a",{onClick:t=>{t.preventDefault(),p("/array/find")},class:"text-blue-600 dark:text-blue-400 hover:underline cursor-pointer",children:"find"})," ","- 조건을 만족하는 첫 요소 찾기"]}),e("li",{children:[e("a",{onClick:t=>{t.preventDefault(),p("/array/filter")},class:"text-blue-600 dark:text-blue-400 hover:underline cursor-pointer",children:"filter"})," ","- 조건을 만족하는 요소 필터링"]}),e("li",{children:[e("a",{onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"text-blue-600 dark:text-blue-400 hover:underline cursor-pointer",children:"pipe"})," ","- every를 다른 변환과 연결"]})]})]})]}),di=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"filter"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Keep only the elements that match a predicate"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is filter?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"filter"})," ","creates a new array containing only the elements that satisfy the predicate function. It does not mutate the original array.",e("br",{}),e("br",{}),"Use it for ",e("strong",{children:"search"}),", ",e("strong",{children:"validation"}),","," ",e("strong",{children:"removing falsy/invalid entries"}),", and"," ",e("strong",{children:"building derived views of data"}),"."]}),e(n,{language:"typescript",code:`import { filter } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5, 6];

filter((n: number) => n % 2 === 0, numbers);
// [2, 4, 6]

filter((n: number) => n > 3, numbers);
// [4, 5, 6]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Type Signature"}),e(n,{language:"typescript",code:`function filter<T>(predicate: (value: T) => boolean, arr: T[]): T[];

// predicate: keep when true
// arr: input array
// returns: filtered array`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Practical Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Remove Nullable Values"}),e(n,{language:"typescript",code:`import { filter } from 'fp-kit';

const values: Array<number | null | undefined> = [1, null, 2, undefined, 3];

const isNumber = (v: number | null | undefined): v is number => typeof v === 'number';

filter(isNumber, values);
// [1, 2, 3]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Filter by Field"}),e(n,{language:"typescript",code:`import { filter } from 'fp-kit';

interface User {
  id: number;
  name: string;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true },
];

const activeUsers = filter((u: User) => u.active, users);
// [{ id: 1, ... }, { id: 3, ... }]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/array/find",onClick:t=>{t.preventDefault(),p("/array/find")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"find →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Get the first element that matches a predicate."})]}),e("a",{href:"/array/every",onClick:t=>{t.preventDefault(),p("/array/every")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"every →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Check if all elements satisfy a predicate."})]})]})]}),ci=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"filter"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"조건을 만족하는 요소만 남기기"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"filter란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"filter"})," ","는 predicate(조건 함수)를 만족하는 요소만 모아 새로운 배열을 반환합니다. 원본 배열은 변경하지 않습니다.",e("br",{}),e("br",{}),e("strong",{children:"검색"}),", ",e("strong",{children:"검증"}),", ",e("strong",{children:"잘못된 데이터 제거"}),","," ",e("strong",{children:"파생 데이터 생성"}),"에 유용합니다."]}),e(n,{language:"typescript",code:`import { filter } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5, 6];

filter((n: number) => n % 2 === 0, numbers);
// [2, 4, 6]

filter((n: number) => n > 3, numbers);
// [4, 5, 6]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"타입 시그니처"}),e(n,{language:"typescript",code:`function filter<T>(predicate: (value: T) => boolean, arr: T[]): T[];

// predicate: true면 유지
// arr: 입력 배열
// returns: 필터링된 배열`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예제"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"null/undefined 제거"}),e(n,{language:"typescript",code:`import { filter } from 'fp-kit';

const values: Array<number | null | undefined> = [1, null, 2, undefined, 3];

const isNumber = (v: number | null | undefined): v is number => typeof v === 'number';

filter(isNumber, values);
// [1, 2, 3]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"필드 기준 필터링"}),e(n,{language:"typescript",code:`import { filter } from 'fp-kit';

interface User {
  id: number;
  name: string;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true },
];

const activeUsers = filter((u: User) => u.active, users);
// [{ id: 1, ... }, { id: 3, ... }]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/array/find",onClick:t=>{t.preventDefault(),p("/array/find")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"find →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"조건을 만족하는 첫 요소를 가져옵니다."})]}),e("a",{href:"/array/every",onClick:t=>{t.preventDefault(),p("/array/every")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"every →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"모든 요소가 조건을 만족하는지 검사합니다."})]})]})]}),mi=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"find"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Get the first element that matches a predicate"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is find?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"find"})," ","returns the first element that satisfies the predicate. If no element matches, it returns ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"undefined"}),".",e("br",{}),e("br",{}),"Useful for ",e("strong",{children:"search"}),", ",e("strong",{children:"finding first match"}),", and"," ",e("strong",{children:"early exit scans"}),"."]}),e(n,{language:"typescript",code:`import { find } from 'fp-kit';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

find(u => u.id === 2, users);
// { id: 2, name: 'Bob' }

find(u => u.name === 'Zoe', users);
// undefined`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Type Signature"}),e(n,{language:"typescript",code:"function find<T>(predicate: (value: T) => boolean, arr: T[]): T | undefined;"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Practical Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Find by Key"}),e(n,{language:"typescript",code:`import { find } from 'fp-kit';

interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 'p1', name: 'Laptop', price: 1000 },
  { id: 'p2', name: 'Mouse', price: 25 },
];

const product = find((p: Product) => p.id === 'p2', products);
// { id: 'p2', name: 'Mouse', price: 25 }`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Optional Result Handling"}),e(n,{language:"typescript",code:`import { find, maybe } from 'fp-kit';

const getUpperName = maybe((u: { name: string }) => u.name.toUpperCase());

const user = find((u: { id: number }) => u.id === 1, [{ id: 1, name: 'alice' }]);
getUpperName(user); // 'ALICE'

const missing = find((u: { id: number }) => u.id === 2, [{ id: 1, name: 'alice' }]);
getUpperName(missing); // null`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/array/filter",onClick:t=>{t.preventDefault(),p("/array/filter")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"filter →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Keep only the elements that match a predicate."})]}),e("a",{href:"/maybe/maybe",onClick:t=>{t.preventDefault(),p("/maybe/maybe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"maybe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Safely transform nullable values."})]})]})]}),pi=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"find"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"조건을 만족하는 첫 요소 찾기"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"find란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"find"})," ","는 predicate(조건 함수)를 만족하는 첫 요소를 반환합니다. 만족하는 요소가 없으면"," ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"undefined"}),"를 반환합니다.",e("br",{}),e("br",{}),e("strong",{children:"검색"}),", ",e("strong",{children:"첫 매칭 찾기"}),", ",e("strong",{children:"빠른 스캔"}),"에 유용합니다."]}),e(n,{language:"typescript",code:`import { find } from 'fp-kit';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

find(u => u.id === 2, users);
// { id: 2, name: 'Bob' }

find(u => u.name === 'Zoe', users);
// undefined`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"타입 시그니처"}),e(n,{language:"typescript",code:"function find<T>(predicate: (value: T) => boolean, arr: T[]): T | undefined;"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예제"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"키로 찾기"}),e(n,{language:"typescript",code:`import { find } from 'fp-kit';

interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 'p1', name: 'Laptop', price: 1000 },
  { id: 'p2', name: 'Mouse', price: 25 },
];

const product = find((p: Product) => p.id === 'p2', products);
// { id: 'p2', name: 'Mouse', price: 25 }`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Optional 값과 함께 쓰기"}),e(n,{language:"typescript",code:`import { find, maybe } from 'fp-kit';

const getUpperName = maybe((u: { name: string }) => u.name.toUpperCase());

const user = find((u: { id: number }) => u.id === 1, [{ id: 1, name: 'alice' }]);
getUpperName(user); // 'ALICE'

const missing = find((u: { id: number }) => u.id === 2, [{ id: 1, name: 'alice' }]);
getUpperName(missing); // null`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/array/filter",onClick:t=>{t.preventDefault(),p("/array/filter")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"filter →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"조건을 만족하는 요소만 남깁니다."})]}),e("a",{href:"/maybe/maybe",onClick:t=>{t.preventDefault(),p("/maybe/maybe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"maybe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"null/undefined에 안전한 변환을 수행합니다."})]})]})]}),ui=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"flatMap"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Map each element to an array and flatten one level"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is flatMap?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"flatMap"})," ","combines ",e("strong",{children:"map"})," and ",e("strong",{children:"flatten"})," in one pass: it transforms each element to an array and then concatenates the results.",e("br",{}),e("br",{}),"Use it for ",e("strong",{children:"expanding items"}),", ",e("strong",{children:"building lists"}),", and"," ",e("strong",{children:"one-to-many transformations"}),"."]}),e(n,{language:"typescript",code:`import { flatMap } from 'fp-kit';

flatMap((n: number) => [n, n * 2], [1, 2, 3]);
// [1, 2, 2, 4, 3, 6]

flatMap((s: string) => s.split(''), ['ab', 'cd']);
// ['a', 'b', 'c', 'd']`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Type Signature"}),e(n,{language:"typescript",code:"function flatMap<T, R>(fn: (value: T) => R[], arr: T[]): R[];"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Practical Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Expand Nested Lists"}),e(n,{language:"typescript",code:`import { flatMap } from 'fp-kit';

interface Order {
  id: string;
  items: string[];
}

const orders: Order[] = [
  { id: 'o1', items: ['apple', 'banana'] },
  { id: 'o2', items: ['orange'] },
];

const allItems = flatMap((o: Order) => o.items, orders);
// ['apple', 'banana', 'orange']`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Generate Pairs"}),e(n,{language:"typescript",code:`import { flatMap } from 'fp-kit';

const letters = ['a', 'b'];
const numbers = [1, 2, 3];

const pairs = flatMap(
  (l: string) => numbers.map(n => [l, n] as const),
  letters
);
// [['a', 1], ['a', 2], ['a', 3], ['b', 1], ['b', 2], ['b', 3]]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/array/groupBy",onClick:t=>{t.preventDefault(),p("/array/groupBy")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"groupBy →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Group elements by a key function."})]}),e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"pipe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Compose flatMap with other transformations."})]})]})]}),gi=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"flatMap"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"매핑 후 1단계 평탄화(flatten)"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"flatMap이란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"flatMap"})," ","는 ",e("strong",{children:"map"}),"과 ",e("strong",{children:"flatten"}),"을 한 번에 수행합니다. 각 요소를 배열로 변환한 뒤, 결과를 한 단계로 이어붙여(flatten) 단일 배열로 만듭니다.",e("br",{}),e("br",{}),e("strong",{children:"확장(1→N)"}),", ",e("strong",{children:"리스트 생성"}),", ",e("strong",{children:"데이터 전개"}),"에 유용합니다."]}),e(n,{language:"typescript",code:`import { flatMap } from 'fp-kit';

flatMap((n: number) => [n, n * 2], [1, 2, 3]);
// [1, 2, 2, 4, 3, 6]

flatMap((s: string) => s.split(''), ['ab', 'cd']);
// ['a', 'b', 'c', 'd']`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"타입 시그니처"}),e(n,{language:"typescript",code:"function flatMap<T, R>(fn: (value: T) => R[], arr: T[]): R[];"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예제"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"중첩 리스트 펼치기"}),e(n,{language:"typescript",code:`import { flatMap } from 'fp-kit';

interface Order {
  id: string;
  items: string[];
}

const orders: Order[] = [
  { id: 'o1', items: ['apple', 'banana'] },
  { id: 'o2', items: ['orange'] },
];

const allItems = flatMap((o: Order) => o.items, orders);
// ['apple', 'banana', 'orange']`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"조합(쌍) 만들기"}),e(n,{language:"typescript",code:`import { flatMap } from 'fp-kit';

const letters = ['a', 'b'];
const numbers = [1, 2, 3];

const pairs = flatMap(
  (l: string) => numbers.map(n => [l, n] as const),
  letters
);
// [['a', 1], ['a', 2], ['a', 3], ['b', 1], ['b', 2], ['b', 3]]`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/array/groupBy",onClick:t=>{t.preventDefault(),p("/array/groupBy")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"groupBy →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"키 함수로 요소를 그룹화합니다."})]}),e("a",{href:"/composition/pipe",onClick:t=>{t.preventDefault(),p("/composition/pipe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"pipe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"flatMap을 다른 변환과 조합합니다."})]})]})]}),xi=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"groupBy"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Group array elements by a key function"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is groupBy?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"groupBy"})," ","transforms an array into an object where each key is derived from the provided function and each value is an array of matching items.",e("br",{}),e("br",{}),"It’s useful for ",e("strong",{children:"categorization"}),", ",e("strong",{children:"reporting"}),","," ",e("strong",{children:"indexing"}),", and ",e("strong",{children:"UI sections"}),"."]}),e(n,{language:"typescript",code:`import { groupBy } from 'fp-kit';

groupBy((n: number) => (n % 2 === 0 ? 'even' : 'odd'), [1, 2, 3, 4]);
// { odd: [1, 3], even: [2, 4] }`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Type Signature"}),e(n,{language:"typescript",code:"function groupBy<T>(fn: (value: T) => string, arr: T[]): Record<string, T[]>;"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"Keys are strings. If multiple items produce the same key, they are collected into the same group."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Practical Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Group Users by Role"}),e(n,{language:"typescript",code:`import { groupBy } from 'fp-kit';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'member';
}

const users: User[] = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'member' },
  { id: 3, name: 'Charlie', role: 'member' },
];

const byRole = groupBy((u: User) => u.role, users);
// { admin: [{...}], member: [{...}, {...}] }`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Build Sections for UI"}),e(n,{language:"typescript",code:`import { groupBy } from 'fp-kit';

interface Message {
  id: string;
  date: string; // 'YYYY-MM-DD'
  text: string;
}

const messages: Message[] = [
  { id: 'm1', date: '2025-01-01', text: 'Happy new year!' },
  { id: 'm2', date: '2025-01-01', text: '🎉' },
  { id: 'm3', date: '2025-01-02', text: 'Back to work' },
];

const byDate = groupBy((m: Message) => m.date, messages);
// Render sections by date keys`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/array/chunk",onClick:t=>{t.preventDefault(),p("/array/chunk")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"chunk →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Split arrays into fixed-size chunks for paging or batching."})]}),e("a",{href:"/array/flatMap",onClick:t=>{t.preventDefault(),p("/array/flatMap")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"flatMap →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"One-to-many transformations by mapping and flattening."})]})]})]}),bi=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"groupBy"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"키 함수 기준으로 배열을 그룹화"}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"groupBy란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"groupBy"})," ","는 배열을 객체로 변환합니다. 각 요소에 대해 키 함수를 실행해 문자열 키를 만들고, 같은 키를 가진 요소들을 하나의 배열로 모아 저장합니다.",e("br",{}),e("br",{}),e("strong",{children:"분류"}),", ",e("strong",{children:"리포팅"}),", ",e("strong",{children:"인덱싱"}),","," ",e("strong",{children:"UI 섹션 구성"}),"에 유용합니다."]}),e(n,{language:"typescript",code:`import { groupBy } from 'fp-kit';

groupBy((n: number) => (n % 2 === 0 ? 'even' : 'odd'), [1, 2, 3, 4]);
// { odd: [1, 3], even: [2, 4] }`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"타입 시그니처"}),e(n,{language:"typescript",code:"function groupBy<T>(fn: (value: T) => string, arr: T[]): Record<string, T[]>;"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"키는 문자열이며, 같은 키가 나오면 해당 그룹에 계속 누적됩니다."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예제"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"역할별 사용자 그룹"}),e(n,{language:"typescript",code:`import { groupBy } from 'fp-kit';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'member';
}

const users: User[] = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'member' },
  { id: 3, name: 'Charlie', role: 'member' },
];

const byRole = groupBy((u: User) => u.role, users);
// { admin: [{...}], member: [{...}, {...}] }`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"UI 섹션 만들기"}),e(n,{language:"typescript",code:`import { groupBy } from 'fp-kit';

interface Message {
  id: string;
  date: string; // 'YYYY-MM-DD'
  text: string;
}

const messages: Message[] = [
  { id: 'm1', date: '2025-01-01', text: '새해 복 많이!' },
  { id: 'm2', date: '2025-01-01', text: '🎉' },
  { id: 'm3', date: '2025-01-02', text: '출근...' },
];

const byDate = groupBy((m: Message) => m.date, messages);
// 날짜별 섹션으로 렌더링`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/array/chunk",onClick:t=>{t.preventDefault(),p("/array/chunk")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"chunk →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"페이지/배치 처리를 위해 고정 크기로 분할합니다."})]}),e("a",{href:"/array/flatMap",onClick:t=>{t.preventDefault(),p("/array/flatMap")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"flatMap →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"1→N 변환을 위해 매핑 후 평탄화합니다."})]})]})]}),hi=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"maybe"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"Safely transform nullable values"}),e("div",{class:"bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 my-6",children:e("p",{class:"text-sm md:text-base text-blue-900 dark:text-blue-200 leading-relaxed",children:[e("strong",{class:"font-semibold",children:"Note:"})," This is a lightweight helper designed for practical null-safe operations. Unlike full Maybe monad/functor implementations found in academic functional programming libraries, this provides a simpler, more approachable tool for everyday JavaScript/TypeScript use cases."]})}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"What is maybe?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"maybe"})," ","creates a null-safe version of a function. If the input value is"," ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"null"})," or"," ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"undefined"}),", it returns ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"null"})," ","without executing the function. Otherwise, it applies the function to the value.",e("br",{}),e("br",{}),"This eliminates the need for repetitive null checks and makes working with"," ",e("strong",{children:"optional values"}),", ",e("strong",{children:"API responses"}),", and"," ",e("strong",{children:"nullable data"})," much safer and cleaner.",e("br",{}),e("br",{}),"Part of the Maybe/Result pattern for handling nullable values functionally."]}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

const toUpper = maybe((s: string) => s.toUpperCase());

toUpper('hello');      // "HELLO"
toUpper(null);         // null
toUpper(undefined);    // null

// No null checks needed!
const processName = maybe((name: string) => {
  return \`Hello, \${name}!\`;
});

processName('Alice');     // "Hello, Alice!"
processName(null);        // null
processName(undefined);   // null`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Type Signature"}),e(n,{language:"typescript",code:`function maybe<T, R>(
  fn: (value: T) => R
): (value: T | null | undefined) => R | null;

// Takes a function that transforms T to R
// Returns a function that accepts T | null | undefined
// and returns R | null`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"The wrapped function will only execute if the value is not null or undefined. Otherwise, it short-circuits and returns null."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Basic Usage"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Simple Transformations"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

// String operations
const toUpper = maybe((s: string) => s.toUpperCase());
const trim = maybe((s: string) => s.trim());
const getLength = maybe((s: string) => s.length);

toUpper('hello');    // "HELLO"
toUpper(null);       // null

trim('  spaces  '); // "spaces"
trim(undefined);    // null

getLength('test');  // 4
getLength(null);    // null

// Number operations
const double = maybe((n: number) => n * 2);
const increment = maybe((n: number) => n + 1);

double(5);        // 10
double(null);     // null

increment(10);    // 11
increment(null);  // null`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Avoiding Null Checks"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

// Without maybe - verbose null checks
function processUser(user: User | null) {
  if (user === null || user === undefined) {
    return null;
  }
  return user.name.toUpperCase();
}

// With maybe - clean and declarative
const processUser = maybe((user: User) => user.name.toUpperCase());

processUser({ name: 'Alice' });  // "ALICE"
processUser(null);               // null`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Practical Examples"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"Accessing Object Properties"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

interface User {
  id: number;
  name: string;
  email: string;
  profile?: {
    bio: string;
    avatar: string;
  };
}

// Safe property access
const getName = maybe((user: User) => user.name);
const getEmail = maybe((user: User) => user.email);
const getBio = maybe((user: User) => user.profile?.bio);

const user: User | null = getCurrentUser();

getName(user);    // "Alice" or null
getEmail(user);   // "alice@example.com" or null
getBio(user);     // "Software engineer" or null or undefined`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"API Response Handling"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

interface ApiResponse {
  data: {
    items: string[];
    total: number;
  };
}

// Extract data safely
const getItems = maybe((response: ApiResponse) => response.data.items);
const getTotal = maybe((response: ApiResponse) => response.data.total);
const getFirstItem = maybe((response: ApiResponse) => response.data.items[0]);

// Usage
const response: ApiResponse | null = await fetchData();

const items = getItems(response);
// items: string[] | null

const total = getTotal(response);
// total: number | null

const firstItem = getFirstItem(response);
// firstItem: string | null | undefined`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Array Processing"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

// Process nullable arrays
const getFirstElement = maybe((arr: any[]) => arr[0]);
const getLength = maybe((arr: any[]) => arr.length);
const mapDouble = maybe((arr: number[]) => arr.map(x => x * 2));

getFirstElement([1, 2, 3]);    // 1
getFirstElement(null);         // null
getFirstElement([]);           // undefined

getLength([1, 2, 3]);          // 3
getLength(null);               // null

mapDouble([1, 2, 3]);          // [2, 4, 6]
mapDouble(null);               // null`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Chaining with pipe"}),e(n,{language:"typescript",code:`import { pipe, maybe } from 'fp-kit';

interface User {
  name: string;
  age: number;
}

// Chain nullable transformations
const processUser = pipe(
  maybe((user: User) => user.name),
  maybe((name: string) => name.toUpperCase()),
  maybe((name: string) => \`Hello, \${name}!\`)
);

processUser({ name: 'Alice', age: 30 });
// "Hello, ALICE!"

processUser(null);
// null

// If any step returns null, the chain short-circuits
const user = { name: '', age: 30 };
const getName = maybe((u: User) => u.name || null);
const greet = maybe((name: string) => \`Hello, \${name}!\`);

pipe(getName, greet)(user);
// null (because name is empty, getName returns null)`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Form Validation"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

interface FormData {
  email: string;
  password: string;
}

// Validate and transform
const validateEmail = maybe((email: string) => {
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return null;
  }
  return email.toLowerCase();
});

const validatePassword = maybe((password: string) => {
  if (password.length < 8) {
    return null;
  }
  return password;
});

// Usage
const formData: FormData | null = getFormData();

const email = validateEmail(formData?.email);
const password = validatePassword(formData?.password);

if (email && password) {
  // Both are valid
  submitForm({ email, password });
} else {
  showError('Invalid form data');
}`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Configuration Access"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

interface Config {
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: {
    darkMode: boolean;
    notifications: boolean;
  };
}

const config: Config | null = loadConfig();

// Safe config accessors
const getApiUrl = maybe((cfg: Config) => cfg.api.baseUrl);
const getTimeout = maybe((cfg: Config) => cfg.api.timeout);
const isDarkMode = maybe((cfg: Config) => cfg.features.darkMode);

const apiUrl = getApiUrl(config) ?? 'https://default.api.com';
const timeout = getTimeout(config) ?? 5000;
const darkMode = isDarkMode(config) ?? false;`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Common Patterns"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"With Default Values"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

const getUsername = maybe((user: User) => user.name);

// Use nullish coalescing for defaults
const username = getUsername(user) ?? 'Guest';
const displayName = getUsername(user) ?? 'Unknown User';

// Or use getOrElse
import { getOrElse } from 'fp-kit';

const username2 = getOrElse('Guest')(getUsername(user));`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Mapping Over Arrays"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

const users: (User | null)[] = [
  { name: 'Alice', age: 30 },
  null,
  { name: 'Bob', age: 25 },
  undefined,
  { name: 'Carol', age: 35 }
];

const getName = maybe((user: User) => user.name);

const names = users.map(getName);
// ["Alice", null, "Bob", null, "Carol"]

// Filter out nulls
const validNames = names.filter(name => name !== null);
// ["Alice", "Bob", "Carol"]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Conditional Transformation"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

// Transform based on condition
const processIfActive = maybe((user: User) => {
  if (!user.active) {
    return null;  // Convert to null if inactive
  }
  return user.name.toUpperCase();
});

processIfActive({ name: 'Alice', active: true });   // "ALICE"
processIfActive({ name: 'Bob', active: false });    // null
processIfActive(null);                              // null`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Why Use maybe?"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"1. Eliminate Null Checks"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200",children:"No more repetitive if statements checking for null or undefined. The function handles it automatically."})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"2. Composable"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200",children:"Works seamlessly with pipe, compose, and other functional utilities. Build complex transformations that safely handle null values."})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"3. Type Safety"}),e("p",{class:"text-sm text-blue-800 dark:text-blue-200",children:"TypeScript knows the result can be null, forcing you to handle both cases explicitly."})]}),e("div",{class:"border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-green-900 dark:text-green-100 mb-2",children:"4. Declarative"}),e("p",{class:"text-sm text-green-800 dark:text-green-200",children:'Express intent clearly: "apply this transformation if the value exists, otherwise return null."'})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Implementation Details"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"maybe checks for null/undefined before applying the function:"}),e(n,{language:"typescript",code:`function maybe<T, R>(
  fn: (value: T) => R
): (value: T | null | undefined) => R | null {
  return (value: T | null | undefined) => {
    if (value === null || value === undefined) {
      return null;
    }
    return fn(value);
  };
}`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:"The function uses strict equality checks for null and undefined, then applies the transformation function only if the value is present."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"Next Steps"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/maybe/getOrElse",onClick:t=>{t.preventDefault(),p("/maybe/getOrElse")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"getOrElse →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Learn about getOrElse for providing default values for null results."})]}),e("a",{href:"/maybe/mapMaybe",onClick:t=>{t.preventDefault(),p("/maybe/mapMaybe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"mapMaybe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Discover mapMaybe for transforming Maybe values in different ways."})]})]})]}),yi=()=>e("div",{class:"prose prose-lg dark:prose-invert max-w-none",children:[e("h1",{class:"text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6",children:"maybe"}),e("p",{class:"text-lg text-gray-600 dark:text-gray-400 mb-8",children:"nullable 값을 안전하게 변환"}),e("div",{class:"bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 my-6",children:e("p",{class:"text-sm md:text-base text-blue-900 dark:text-blue-200 leading-relaxed",children:[e("strong",{class:"font-semibold",children:"참고:"})," 이것은 실용적인 null-safe 연산을 위해 설계된 가벼운 헬퍼입니다. 학술적인 함수형 프로그래밍 라이브러리에서 찾을 수 있는 완전한 Maybe 모나드/펑터 구현과는 달리, 일상적인 JavaScript/TypeScript 사용 사례를 위한 더 간단하고 접근하기 쉬운 도구를 제공합니다."]})}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"maybe란 무엇인가?"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:[e("strong",{class:"font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded",children:"maybe"})," ","는 함수의 null-safe 버전을 생성합니다. 입력 값이"," ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"null"})," 또는"," ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"undefined"}),"이면, 함수를 실행하지 않고 ",e("code",{class:"px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded",children:"null"}),"을 반환합니다. 그렇지 않으면 값에 함수를 적용합니다.",e("br",{}),e("br",{}),"이는 반복적인 null 검사의 필요성을 제거하고 ",e("strong",{children:"선택적 값"}),","," ",e("strong",{children:"API 응답"}),", 그리고 ",e("strong",{children:"nullable 데이터"})," 작업을 훨씬 안전하고 깔끔하게 만듭니다.",e("br",{}),e("br",{}),"nullable 값을 함수형으로 처리하기 위한 Maybe/Result 패턴의 일부입니다."]}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

const toUpper = maybe((s: string) => s.toUpperCase());

toUpper('hello');      // "HELLO"
toUpper(null);         // null
toUpper(undefined);    // null

// null 검사가 필요 없습니다!
const processName = maybe((name: string) => {
  return \`안녕하세요, \${name}님!\`;
});

processName('Alice');     // "안녕하세요, Alice님!"
processName(null);        // null
processName(undefined);   // null`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"타입 시그니처"}),e(n,{language:"typescript",code:`function maybe<T, R>(
  fn: (value: T) => R
): (value: T | null | undefined) => R | null;

// T를 R로 변환하는 함수를 받음
// T | null | undefined를 받아들이는 함수를 반환
// R | null을 반환`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"래핑된 함수는 값이 null이나 undefined가 아닐 때만 실행됩니다. 그렇지 않으면 단락(short-circuit)되어 null을 반환합니다."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"기본 사용법"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"간단한 변환"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

// 문자열 연산
const toUpper = maybe((s: string) => s.toUpperCase());
const trim = maybe((s: string) => s.trim());
const getLength = maybe((s: string) => s.length);

toUpper('hello');    // "HELLO"
toUpper(null);       // null

trim('  spaces  '); // "spaces"
trim(undefined);    // null

getLength('test');  // 4
getLength(null);    // null

// 숫자 연산
const double = maybe((n: number) => n * 2);
const increment = maybe((n: number) => n + 1);

double(5);        // 10
double(null);     // null

increment(10);    // 11
increment(null);  // null`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"Null 검사 피하기"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

// maybe 없이 - 장황한 null 검사
function processUser(user: User | null) {
  if (user === null || user === undefined) {
    return null;
  }
  return user.name.toUpperCase();
}

// maybe와 함께 - 깔끔하고 선언적
const processUser = maybe((user: User) => user.name.toUpperCase());

processUser({ name: 'Alice' });  // "ALICE"
processUser(null);               // null`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"실전 예제"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"객체 속성 접근"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

interface User {
  id: number;
  name: string;
  email: string;
  profile?: {
    bio: string;
    avatar: string;
  };
}

// 안전한 속성 접근
const getName = maybe((user: User) => user.name);
const getEmail = maybe((user: User) => user.email);
const getBio = maybe((user: User) => user.profile?.bio);

const user: User | null = getCurrentUser();

getName(user);    // "Alice" 또는 null
getEmail(user);   // "alice@example.com" 또는 null
getBio(user);     // "Software engineer" 또는 null 또는 undefined`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"API 응답 처리"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

interface ApiResponse {
  data: {
    items: string[];
    total: number;
  };
}

// 데이터를 안전하게 추출
const getItems = maybe((response: ApiResponse) => response.data.items);
const getTotal = maybe((response: ApiResponse) => response.data.total);
const getFirstItem = maybe((response: ApiResponse) => response.data.items[0]);

// 사용
const response: ApiResponse | null = await fetchData();

const items = getItems(response);
// items: string[] | null

const total = getTotal(response);
// total: number | null

const firstItem = getFirstItem(response);
// firstItem: string | null | undefined`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"배열 처리"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

// nullable 배열 처리
const getFirstElement = maybe((arr: any[]) => arr[0]);
const getLength = maybe((arr: any[]) => arr.length);
const mapDouble = maybe((arr: number[]) => arr.map(x => x * 2));

getFirstElement([1, 2, 3]);    // 1
getFirstElement(null);         // null
getFirstElement([]);           // undefined

getLength([1, 2, 3]);          // 3
getLength(null);               // null

mapDouble([1, 2, 3]);          // [2, 4, 6]
mapDouble(null);               // null`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"pipe와 체이닝"}),e(n,{language:"typescript",code:`import { pipe, maybe } from 'fp-kit';

interface User {
  name: string;
  age: number;
}

// nullable 변환 체인
const processUser = pipe(
  maybe((user: User) => user.name),
  maybe((name: string) => name.toUpperCase()),
  maybe((name: string) => \`안녕하세요, \${name}님!\`)
);

processUser({ name: 'Alice', age: 30 });
// "안녕하세요, ALICE님!"

processUser(null);
// null

// 어떤 단계라도 null을 반환하면 체인이 단락됩니다
const user = { name: '', age: 30 };
const getName = maybe((u: User) => u.name || null);
const greet = maybe((name: string) => \`안녕하세요, \${name}님!\`);

pipe(getName, greet)(user);
// null (이름이 비어있어서 getName이 null 반환)`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"폼 검증"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

interface FormData {
  email: string;
  password: string;
}

// 검증 및 변환
const validateEmail = maybe((email: string) => {
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return null;
  }
  return email.toLowerCase();
});

const validatePassword = maybe((password: string) => {
  if (password.length < 8) {
    return null;
  }
  return password;
});

// 사용
const formData: FormData | null = getFormData();

const email = validateEmail(formData?.email);
const password = validatePassword(formData?.password);

if (email && password) {
  // 둘 다 유효함
  submitForm({ email, password });
} else {
  showError('유효하지 않은 폼 데이터');
}`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"설정 접근"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

interface Config {
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: {
    darkMode: boolean;
    notifications: boolean;
  };
}

const config: Config | null = loadConfig();

// 안전한 설정 접근자
const getApiUrl = maybe((cfg: Config) => cfg.api.baseUrl);
const getTimeout = maybe((cfg: Config) => cfg.api.timeout);
const isDarkMode = maybe((cfg: Config) => cfg.features.darkMode);

const apiUrl = getApiUrl(config) ?? 'https://default.api.com';
const timeout = getTimeout(config) ?? 5000;
const darkMode = isDarkMode(config) ?? false;`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"일반적인 패턴"}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4",children:"기본값 사용"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

const getUsername = maybe((user: User) => user.name);

// 기본값을 위해 널 병합 연산자 사용
const username = getUsername(user) ?? 'Guest';
const displayName = getUsername(user) ?? 'Unknown User';

// 또는 getOrElse 사용
import { getOrElse } from 'fp-kit';

const username2 = getOrElse('Guest')(getUsername(user));`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"배열에 매핑"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

const users: (User | null)[] = [
  { name: 'Alice', age: 30 },
  null,
  { name: 'Bob', age: 25 },
  undefined,
  { name: 'Carol', age: 35 }
];

const getName = maybe((user: User) => user.name);

const names = users.map(getName);
// ["Alice", null, "Bob", null, "Carol"]

// null 필터링
const validNames = names.filter(name => name !== null);
// ["Alice", "Bob", "Carol"]`}),e("h3",{class:"text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6",children:"조건부 변환"}),e(n,{language:"typescript",code:`import { maybe } from 'fp-kit';

// 조건에 따라 변환
const processIfActive = maybe((user: User) => {
  if (!user.active) {
    return null;  // 비활성이면 null로 변환
  }
  return user.name.toUpperCase();
});

processIfActive({ name: 'Alice', active: true });   // "ALICE"
processIfActive({ name: 'Bob', active: false });    // null
processIfActive(null);                              // null`}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"왜 maybe를 사용하나요?"}),e("div",{class:"space-y-4",children:[e("div",{class:"border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-pink-900 dark:text-pink-100 mb-2",children:"1. Null 검사 제거"}),e("p",{class:"text-sm text-pink-800 dark:text-pink-200",children:"null이나 undefined를 확인하는 반복적인 if 문이 더 이상 필요 없습니다. 함수가 자동으로 처리합니다."})]}),e("div",{class:"border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-purple-900 dark:text-purple-100 mb-2",children:"2. 조합 가능"}),e("p",{class:"text-sm text-purple-800 dark:text-purple-200",children:"pipe, compose 및 기타 함수형 유틸리티와 원활하게 작동합니다. null 값을 안전하게 처리하는 복잡한 변환을 구축하세요."})]}),e("div",{class:"border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-blue-900 dark:text-blue-100 mb-2",children:"3. 타입 안정성"}),e("p",{class:"text-sm text-blue-800 dark:text-blue-200",children:"TypeScript는 결과가 null일 수 있음을 알고 있어, 두 경우를 모두 명시적으로 처리하도록 강제합니다."})]}),e("div",{class:"border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r",children:[e("h4",{class:"font-semibold text-green-900 dark:text-green-100 mb-2",children:"4. 선언적"}),e("p",{class:"text-sm text-green-800 dark:text-green-200",children:'의도를 명확하게 표현합니다: "값이 존재하면 이 변환을 적용하고, 그렇지 않으면 null을 반환하라."'})]})]}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"구현 세부 사항"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6",children:"maybe는 함수를 적용하기 전에 null/undefined를 확인합니다:"}),e(n,{language:"typescript",code:`function maybe<T, R>(
  fn: (value: T) => R
): (value: T | null | undefined) => R | null {
  return (value: T | null | undefined) => {
    if (value === null || value === undefined) {
      return null;
    }
    return fn(value);
  };
}`}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4",children:"함수는 null과 undefined에 대해 엄격한 동등성 검사를 사용한 다음, 값이 있을 때만 변환 함수를 적용합니다."}),e("hr",{class:"border-t border-gray-200 dark:border-gray-700 my-10"}),e("h2",{class:"text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4",children:"다음 단계"}),e("div",{class:"grid gap-6 mt-6",children:[e("a",{href:"/maybe/getOrElse",onClick:t=>{t.preventDefault(),p("/maybe/getOrElse")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2",children:"getOrElse →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"null 결과에 기본값을 제공하는 getOrElse에 대해 알아보세요."})]}),e("a",{href:"/maybe/mapMaybe",onClick:t=>{t.preventDefault(),p("/maybe/mapMaybe")},class:"block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer",children:[e("h3",{class:"text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2",children:"mapMaybe →"}),e("p",{class:"text-sm md:text-base text-gray-700 dark:text-gray-300",children:"Maybe 값을 다양한 방식으로 변환하는 mapMaybe를 알아보세요."})]})]})]}),fi=t=>t.replace(/\/+$/,"")||"/",ki={"/":Vt,"/ko":Ia,"/composition/pipe":Bn,"/ko/composition/pipe":Ln,"/composition/compose":zn,"/ko/composition/compose":Fn,"/composition/curry":$n,"/ko/composition/curry":Hn,"/composition/partial":Wn,"/ko/composition/partial":Gn,"/composition/flip":jn,"/ko/composition/flip":Vn,"/composition/identity":Kn,"/ko/composition/identity":qn,"/composition/constant":Zn,"/ko/composition/constant":Yn,"/composition/memoize":Jn,"/ko/composition/memoize":Xn,"/composition/once":Qn,"/ko/composition/once":ei,"/composition/tap":ti,"/ko/composition/tap":ri,"/array/chunk":ai,"/ko/array/chunk":ni,"/array/drop":ii,"/ko/array/drop":si,"/array/every":oi,"/ko/array/every":li,"/array/filter":di,"/ko/array/filter":ci,"/array/find":mi,"/ko/array/find":pi,"/array/flatMap":ui,"/ko/array/flatMap":gi,"/array/groupBy":xi,"/ko/array/groupBy":bi,"/maybe/maybe":hi,"/ko/maybe/maybe":yi},vi=t=>{const r=fi(t);return ki[r]||Vt},wi=Qe(t=>{const r=Le.watch(t);return()=>{const a=vi(r.route);return e("div",{class:"min-h-screen bg-white dark:bg-[#1b1b1f] transition-colors",children:[e(Ma,{}),e("div",{class:"mx-auto max-w-[1440px]",children:e("div",{class:"flex",children:[e(Oa,{}),e("main",{class:"flex-1 w-full min-w-0 px-6 md:px-12 py-8 max-w-full",children:e("div",{class:"max-w-full md:max-w-[43rem] page-shell",children:e(a,{})})})]})})]})}});Gr(e(wi,{}),document.body);
//# sourceMappingURL=index-CE0MIVHm.js.map
