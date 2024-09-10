"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _createStarExport(obj) { Object.keys(obj) .filter((key) => key !== "default" && key !== "__esModule") .forEach((key) => { if (exports.hasOwnProperty(key)) { return; } Object.defineProperty(exports, key, {enumerable: true, configurable: true, get: () => obj[key]}); }); } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _reactquery = require('@tanstack/react-query'); _createStarExport(_reactquery);function A(e){return e.replace(/^\/+/,"").replace(/\/+$/,"")}var g=(e,t)=>{let a=A(e.path.replace(/{(\w+)}/g,(o,s)=>e.params[s].toString()));return t?`${a}/`:a};var _reactquerydevtools = require('@tanstack/react-query-devtools');var _react = require('react'); var _react2 = _interopRequireDefault(_react);var O=class e extends Error{constructor(a,o,s){super(a);this.message=a;this.status=o;this.data=s;Object.setPrototypeOf(this,e.prototype),this.name=this.constructor.name,typeof Error.captureStackTrace=="function"?Error.captureStackTrace(this,this.constructor):this.stack=new Error(a).stack,this.stack=new Error().stack,console.error(this.message,this)}};var ae=e=>{if(e!==null&&typeof e=="object"){let t={};return Object.entries(e).forEach(([o,s])=>{(s||typeof s=="boolean"||typeof s=="number")&&(t[o]=s)}),t}return{}};function U(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var $=e=>{let{onSuccess:t,onError:a}=e,o=e.data instanceof FormData,s=(()=>{let r=e.url;if(e.params){let y=ae(e.params);if(e.queryParamsSerializer)r+=`?${e.queryParamsSerializer(e.params)}`;else if(Object.keys(y).length>0){let c=[];for(let Q in y)y.hasOwnProperty(Q)&&(Array.isArray(y[Q])?y[Q].forEach(D=>{c.push(`${U(Q)}${e.queryArrayParamStyle==="indexedArray"?"[]":""}=${U(D)}`)}):c.push(`${U(Q)}=${U(y[Q])}`));r+=`?${c.join("&")}`}}let[u,p]=r.split("?");return`${u}${p?`?${p}`:""}`})(),i=o?e.data:e.data?JSON.stringify(e.data):"",n={method:e.method,headers:{...!o&&{"Content-Type":"application/json"},...e.authorization&&{Authorization:e.authorization},...e.headers},...i&&{body:i},...e.options};return fetch(s,n).then(async r=>{let u=await(async()=>{try{let y=_optionalChain([r, 'access', _2 => _2.headers, 'access', _3 => _3.get, 'call', _4 => _4("Content-Type"), 'optionalAccess', _5 => _5.toLowerCase, 'call', _6 => _6()])||"";return y.includes("application/json")?await r.json():y.includes("text/plain")||y.includes("text/csv")||y.includes("application/xml")||y.includes("text/xml")||y.includes("application/javascript")||y.includes("text/html")?await r.text():y.includes("multipart/form-data")?await r.formData():await r.blob()}catch(y){throw console.error("Error handling response:",y),y}})(),p={};return r.headers.forEach((y,c)=>{p[c]=y}),{status:r.status,statusText:r.statusText,headers:p,data:u}}).then(r=>{if(r.status<200||r.status>=300){let u=new O(`Request failed with status code: ${r.status}`,r.status,r.data);return a&&a(u,e),Promise.reject(u)}return t&&t(r,e),Promise.resolve(r)}).catch(r=>Promise.reject(new O(r.message)))};var _headless = require('react-hot-toast/headless'); var _headless2 = _interopRequireDefault(_headless);var ne=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"&&window.matchMedia){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})();function oe({id:e,className:t,style:a,onHeightUpdate:o,children:s}){let i=_react.useCallback.call(void 0, n=>{if(n){let r=()=>{let{height:u}=n.getBoundingClientRect();o(e,u)};r(),new MutationObserver(r).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return _react2.default.createElement("div",{"data-toast-id":e,ref:i,className:t,style:a},s)}var ie=(e,t)=>{let a=e.includes("top"),o=a?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:ne()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...o,...s}},I=16;function k({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:o,children:s,containerStyle:i,containerClassName:n}){let{toasts:r,handlers:u}=_headless.useToaster.call(void 0, a);return _react2.default.createElement("div",{style:{position:"fixed",zIndex:9999,top:I,left:I,right:I,bottom:I,pointerEvents:"none",...i},className:n,onMouseEnter:u.startPause,onMouseLeave:u.endPause},r.map(p=>{let y=p.position||t,c={...p,position:y},Q=u.calculateOffset(c,{reverseOrder:e,gutter:o,defaultPosition:t}),D=ie(y,Q),E=s;return _react2.default.createElement(oe,{id:c.id,key:c.id,onHeightUpdate:u.updateHeight,style:{...D,pointerEvents:"auto"}},c.type==="custom"?_headless.resolveValue.call(void 0, p.message,c):E?_react2.default.createElement(E,{...c}):_react2.default.createElement("div",{style:{display:p.visible?"flex":"none"}},_headless.resolveValue.call(void 0, c.message,c)))}))}var _reacthottoast = require('react-hot-toast');var{remove:Ne,...pe}=_headless2.default,q= exports.toast =Object.assign((...e)=>_headless2.default.call(void 0, ...e),pe),We= exports.ToastBar =_reacthottoast.ToastBar,ze= exports.resolveToastValue =_reacthottoast.resolveValue;var _eventemitter3 = require('eventemitter3'); var _eventemitter32 = _interopRequireDefault(_eventemitter3);var W=new _eventemitter32.default,M={once:(e,t)=>{W.once(e,t)},emit:(e,t)=>{W.emit(e,t)}};var H=_react.createContext.call(void 0, {apiUrl:"",apiEnsureTrailingSlash:!1,apiClient:$,toastUndo:()=>{}}),C= exports.useRQWrapperContext =()=>_react.useContext.call(void 0, H);function ot({children:e,config:t={},apiUrl:a,apiClient:o=$,apiEnsureTrailingSlash:s=!1,apiAuthorization:i,apiHeaders:n,apiOnSuccess:r,apiOnError:u,isDevTools:p,devToolsOptions:y,toast:c}){let Q=_react.useMemo.call(void 0, ()=>new (0, _reactquery.QueryClient)({...t,defaultOptions:{..._optionalChain([t, 'optionalAccess', _7 => _7.defaultOptions]),queries:{gcTime:3e5,staleTime:3e5,retry:!1,..._optionalChain([t, 'optionalAccess', _8 => _8.defaultOptions, 'optionalAccess', _9 => _9.queries])}}}),[]),D=_react.useCallback.call(void 0, T=>{let m=i?i():"",P=n?n():{},l=(...d)=>{r&&r(...d),T.onSuccess&&T.onSuccess(...d)},f=(...d)=>{u&&u(...d),T.onError&&T.onError(...d)};return o({...T,headers:T.headers?{...P,...T.headers}:P,authorization:T.authorization||m,onSuccess:l,onError:f})},[]),E=_react.useCallback.call(void 0, T=>{let m=!1;q.dismiss();let P=()=>{m=!0,M.emit("end",!0),q.dismiss()};process.env.NODE_ENV!=="test"&&q.success(l=>{let f=_optionalChain([c, 'optionalAccess', _10 => _10.CustomUndoContent]);return!l.visible&&!m&&(m=!0,M.emit("end",!1)),f?_react2.default.createElement(f,{message:T.message,onUndo:P,type:T.type,toast:l}):_react2.default.createElement(_react2.default.Fragment,null,T.message,_react2.default.createElement("span",{style:{marginLeft:"10px",cursor:"pointer"},onClick:P,role:"button",tabIndex:0,"aria-label":"Undo",title:"Undo"},"UNDO"))},{duration:_optionalChain([c, 'optionalAccess', _11 => _11.globalProps, 'optionalAccess', _12 => _12.toastOptions, 'optionalAccess', _13 => _13.duration])||5e3})},[]),b=_react.useMemo.call(void 0, ()=>({apiUrl:A(a),apiClient:D,apiEnsureTrailingSlash:s,toastUndo:E}),[a,D,E,s]);return _react2.default.createElement(_reactquery.QueryClientProvider,{client:Q},process.env.NODE_ENV!=="test"&&_react2.default.createElement(k,{..._optionalChain([c, 'optionalAccess', _14 => _14.globalProps])},_optionalChain([c, 'optionalAccess', _15 => _15.CustomContent])),_react2.default.createElement(H.Provider,{value:b},e),p&&_react2.default.createElement(_reactquerydevtools.ReactQueryDevtools,{buttonPosition:"bottom-right",initialIsOpen:!1,...y}))}var ct=({queryOptions:e,resource:t,params:a={},apiClientParams:o})=>{let{apiUrl:s,apiClient:i,apiEnsureTrailingSlash:n}=C();return _reactquery.useQuery.call(void 0, {...e,queryKey:["get-list",t.path,t.params,a,..._optionalChain([e, 'optionalAccess', _16 => _16.queryKey])?e.queryKey:[]],queryFn:async({queryKey:u})=>{let p={resource:t,params:a,queryKey:u},y=`${s}/${g(p.resource,n)}`;return _optionalChain([e, 'optionalAccess', _17 => _17.queryFn])?await _optionalChain([e, 'optionalAccess', _18 => _18.queryFn, 'call', _19 => _19({apiClient:i,apiUrl:s,variables:p,url:y})]):await i({url:y,method:"GET",params:a,...o})}})};var ht=({queryOptions:e,resource:t,params:a={},apiClientParams:o,pagination:s})=>{let{apiUrl:i,apiClient:n,apiEnsureTrailingSlash:r}=C();return _reactquery.useInfiniteQuery.call(void 0, {initialPageParam:1,getNextPageParam:(...p)=>{let y=p[0],c=Number(p[2]);if(_optionalChain([y, 'optionalAccess', _20 => _20.data, 'optionalAccess', _21 => _21.length]))return c+1},getPreviousPageParam:(...p)=>{let y=Number(p[2]);if(!(y<=1))return y-1},...e,queryKey:["get-infinite-list",t.path,t.params,s,a,..._optionalChain([e, 'optionalAccess', _22 => _22.queryKey])?e.queryKey:[]],queryFn:async({queryKey:p,pageParam:y})=>{let c={resource:t,params:{...a,[s.page[0]]:y,[s.per_page[0]]:s.per_page[1]},queryKey:p},Q=`${i}/${g(c.resource,r)}`;return _optionalChain([e, 'optionalAccess', _23 => _23.queryFn])?await _optionalChain([e, 'optionalAccess', _24 => _24.queryFn, 'call', _25 => _25({apiClient:n,apiUrl:i,variables:c,url:Q})]):await n({url:Q,method:"GET",params:c.params,...o})}})};var Et=({resource:e,id:t,queryOptions:a,params:o={},apiClientParams:s})=>{let{apiUrl:i,apiClient:n,apiEnsureTrailingSlash:r}=C();return _reactquery.useQuery.call(void 0, {...a,queryKey:["get-one",e.path,e.params,String(t),o,..._optionalChain([a, 'optionalAccess', _26 => _26.queryKey])?a.queryKey:[]],queryFn:async({queryKey:p})=>{let y={id:t,resource:e,params:o,queryKey:p},c=`${i}/${g(y.resource,!0)}`;return _optionalChain([a, 'optionalAccess', _27 => _27.queryFn])?await _optionalChain([a, 'optionalAccess', _28 => _28.queryFn, 'call', _29 => _29({apiClient:n,apiUrl:i,variables:y,url:c})]):await n({url:`${c}${y.id}${r?"/":""}`,method:"GET",params:o,...s})}})};var _=({queryClient:e,data:t,queryKeysOne:a})=>{a&&a.forEach(o=>{e.setQueryData(o,t)})};var J=({queryClient:e,data:t,queryKeysList:a,queryKeysInfiniteList:o,cacheAddItemTo:s="start"})=>{let i=n=>!n||!(n.data instanceof Array)?n:{...n,data:s==="start"?[...t,...n.data]:[...n.data,...t]};a&&a.forEach(n=>{e.setQueriesData({queryKey:n},i)}),o&&o.forEach(n=>{e.setQueriesData({queryKey:n},r=>r&&{...r,pages:r.pages.map(i)})})};var Y=({queryClient:e,ids:t,queryKeysOne:a,queryKeysList:o,queryKeysInfiniteList:s})=>{let i=n=>!n||!(n.data instanceof Array)?n:{...n,data:n.data.filter(r=>!t.some(u=>String(u)===String(r.id)))};a&&a.forEach(n=>{e.removeQueries({queryKey:n})}),o&&o.forEach(n=>{e.setQueriesData({queryKey:n},i)}),s&&s.forEach(n=>{e.setQueriesData({queryKey:n},r=>r&&{...r,pages:r.pages.map(i)})})};var h={getOne:(e,t)=>["get-one",e.path,e.params,String(t)],getOneArray:(e,t)=>t.map(a=>["get-one",e.path,e.params,String(a)]),getList:e=>["get-list",e.path,e.params],getInfiniteList:e=>["get-infinite-list",e.path,e.params],getDataQuery:e=>["query-data",e.path,e.params]};function j(e,t){if(typeof e!=typeof t)return!1;if(e instanceof Object&&t instanceof Object){let a=Object.keys(e),o=Object.keys(t);if(a.length!==o.length)return!1;for(let s of a){let i=e[s],n=t[s];if(i!==n&&!j(i,n))return!1}return!0}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let a=0;a<e.length;a++)if(e[a]!==t[a]&&!j(e[a],t[a]))return!1;return!0}return e===t}var Lt=({queryClient:e,queryKeys:t})=>{e.invalidateQueries({predicate:a=>{let o=a.queryKey;return t.some(s=>s.every(i=>o.some(n=>j(n,i))))}})};var L=({queryClient:e,queryKeys:t})=>{t.forEach(a=>{e.invalidateQueries({queryKey:a})})};function X(e){return!Number.isNaN(parseFloat(e))&&Number.isFinite(e)}function Qe(e,t){return X(e)&&X(t)||typeof e==typeof t}function w(e,t){let a={...e};if(e instanceof Object&&t instanceof Object){for(let o in t)if(o in e){let s=e[o],i=t[o],n=typeof s==typeof i&&(Array.isArray(s)&&Array.isArray(i)||s!==null&&!Array.isArray(s)&&typeof s=="object"&&!Array.isArray(i)&&typeof i=="object"||typeof s!="object"&&typeof i!="object"),r=Qe(s,i);(n||r)&&(typeof s=="object"&&s!==null&&!Array.isArray(s)?a[o]=w(s,i):a[o]=i)}}return a}var Z=({queryClient:e,data:t,ids:a,queryKeysOne:o,queryKeysList:s,queryKeysInfiniteList:i})=>{let n=r=>!r||!(r.data instanceof Array)?r:{...r,data:r.data.map(u=>a.some(p=>String(p)===String(u.id))?w(u,t):u)};o&&o.forEach(r=>{e.setQueriesData({queryKey:r},u=>!u||!(u.data instanceof Object)||!(t instanceof Object)?u:{...u,data:w(u.data,t)})}),s&&s.forEach(r=>{e.setQueriesData({queryKey:r},n)}),i&&i.forEach(r=>{e.setQueriesData({queryKey:r},u=>u&&{...u,pages:u.pages.map(n)})})};var V=async(e,t)=>{let a=t.reduce((o,s)=>o.concat(e.getQueriesData({queryKey:s})),[]);return await Promise.all(a.map(([o])=>e.cancelQueries({queryKey:o}))),a};var ee=({resourcePath:e,mutationOptions:t,mode:a={optimistic:!0,undoable:!0},extraResources:o=[],shouldUpdateCurrentResource:s=!0,isInvalidateCache:i=!0,type:n="many"})=>{let{apiUrl:r,apiClient:u,apiEnsureTrailingSlash:p,toastUndo:y}=C(),c=_reactquery.useQueryClient.call(void 0, ),Q=_react.useRef.call(void 0, []),D=()=>{Q.current.forEach(([m,P])=>{c.setQueryData(m,P)})},{mutate:E,...b}=_reactquery.useMutation.call(void 0, {...t,mutationKey:[n==="many"?"delete-many":"delete-one",e,..._optionalChain([t, 'optionalAccess', _30 => _30.mutationKey])?t.mutationKey:[]],mutationFn:async m=>{let P=`${r}/${g(m.resource,!0)}`;if(_optionalChain([t, 'optionalAccess', _31 => _31.mutationFn]))return await _optionalChain([t, 'optionalAccess', _32 => _32.mutationFn, 'call', _33 => _33({apiClient:u,apiUrl:r,variables:m,url:P})]);let l=n==="many"?m.ids:[m.id],f=await Promise.allSettled(l.map(x=>u({url:`${P}${x}${p?"/":""}`,method:"DELETE",...m.apiClientParams}))),d=[];return f.forEach(x=>{if(x.status==="fulfilled")d.push(x.value);else throw x.reason}),n==="many"?d:d[0]},onSuccess:(...m)=>{let P=m[1],l=[h.getList(P.resource),h.getInfiniteList(P.resource)];o.forEach(f=>{l.push(h.getList(f)),l.push(h.getInfiniteList(f))}),i&&L({queryClient:c,queryKeys:l}),_optionalChain([t, 'optionalAccess', _34 => _34.onSuccess])&&t.onSuccess(...m)},onError:(...m)=>{_optionalChain([t, 'optionalAccess', _35 => _35.onError])&&t.onError(...m),D()}});return{mutation:b,delete:async({resourceParams:m,undoMessage:P,...l})=>{let f={path:e,params:m},d=n==="many"?l.ids:[l.id];if(a.optimistic){let x=s?h.getOneArray(f,d):[],R=s?[h.getList(f)]:[],F=s?[h.getInfiniteList(f)]:[];o.forEach(v=>{x.push(...h.getOneArray(v,d)),R.push(h.getList(v)),F.push(h.getInfiniteList(v))}),Q.current=await V(c,[...x,...R,...F]),Y({queryClient:c,ids:d,queryKeysOne:x,queryKeysList:R,queryKeysInfiniteList:F})}if(a.undoable){let x=d.length>1;M.once("end",R=>{R?D():E({...l,resource:f})}),y({message:P||`Element${x?"s":""} deleted`,type:x?"delete-many":"delete-one"})}else E({...l,resource:f})}}},Xt= exports.useDeleteOne =e=>ee({...e,type:"one"}),Zt= exports.useDeleteMany =e=>ee({...e,type:"many"});var te=({resourcePath:e,mutationOptions:t,mode:a={optimistic:!0,undoable:!0},extraResources:o=[],shouldUpdateCurrentResource:s=!0,type:i="many"})=>{let{apiUrl:n,apiClient:r,apiEnsureTrailingSlash:u,toastUndo:p}=C(),y=_reactquery.useQueryClient.call(void 0, ),c=_react.useRef.call(void 0, []),Q=()=>{c.current.forEach(([T,m])=>{y.setQueryData(T,m)})},{mutate:D,...E}=_reactquery.useMutation.call(void 0, {...t,mutationKey:[i==="many"?"update-many":"update-one",e,..._optionalChain([t, 'optionalAccess', _36 => _36.mutationKey])?t.mutationKey:[]],mutationFn:async T=>{let m=`${n}/${g(T.resource,!0)}`;if(_optionalChain([t, 'optionalAccess', _37 => _37.mutationFn]))return await _optionalChain([t, 'optionalAccess', _38 => _38.mutationFn, 'call', _39 => _39({apiClient:r,apiUrl:n,variables:T,url:m})]);let P=i==="many"?T.ids:[T.id],l=await Promise.allSettled(P.map(d=>r({url:`${m}${d}${u?"/":""}`,method:"PATCH",data:T.data,...T.apiClientParams}))),f=[];return l.forEach(d=>{if(d.status==="fulfilled")f.push(d.value);else throw d.reason}),i==="many"?f:f[0]},onSuccess:(...T)=>{let m=T[1];if(!a.optimistic){let P=i==="many"?m.ids:[m.id],l=[...h.getOneArray(m.resource,P),h.getList(m.resource),h.getInfiniteList(m.resource)];o.forEach(f=>{l.push(...h.getOneArray(f,P)),l.push(h.getList(f)),l.push(h.getInfiniteList(f))}),L({queryClient:y,queryKeys:l})}_optionalChain([t, 'optionalAccess', _40 => _40.onSuccess])&&t.onSuccess(...T)},onError:(...T)=>{_optionalChain([t, 'optionalAccess', _41 => _41.onError])&&t.onError(...T),Q()}});return{mutation:E,update:async({resourceParams:T,undoMessage:m,...P})=>{let l={path:e,params:T},f=i==="many"?P.ids:[P.id];if(a.optimistic){let d=s?h.getOneArray(l,f):[],x=s?[h.getList(l)]:[],R=s?[h.getInfiniteList(l)]:[];o.forEach(F=>{d.push(...h.getOneArray(F,f)),x.push(h.getList(F)),R.push(h.getInfiniteList(F))}),c.current=await V(y,[...d,...x,...R]),Z({queryClient:y,data:P.data,ids:f,queryKeysOne:d,queryKeysList:x,queryKeysInfiniteList:R})}if(a.undoable){let d=f.length>1;M.once("end",x=>{x?Q():D({...P,resource:l})}),p({message:m||`Element${d?"s":""} updated`,type:d?"update-many":"update-one"})}else D({...P,resource:l})}}},ua= exports.useUpdateOne =e=>te({...e,type:"one"}),ya= exports.useUpdateMany =e=>te({...e,type:"many"});var fa=({resourcePath:e,mutationOptions:t,extraResources:a=[],shouldUpdateCurrentResource:o=!0,cacheAddItemTo:s="start",isInvalidateCache:i=!0})=>{let{apiUrl:n,apiClient:r,apiEnsureTrailingSlash:u}=C(),p=_reactquery.useQueryClient.call(void 0, ),{mutate:y,...c}=_reactquery.useMutation.call(void 0, {...t,mutationKey:["create",e,..._optionalChain([t, 'optionalAccess', _42 => _42.mutationKey])?t.mutationKey:[]],mutationFn:async D=>{let E=`${n}/${g(D.resource,u)}`;return _optionalChain([t, 'optionalAccess', _43 => _43.mutationFn])?await _optionalChain([t, 'optionalAccess', _44 => _44.mutationFn, 'call', _45 => _45({apiClient:r,apiUrl:n,variables:D,url:E})]):await r({url:E,method:"POST",data:D.data,...D.apiClientParams})},onSuccess:(...D)=>{let E=D[0];if(E){let b=D[1],T=o?[h.getList(b.resource)]:[],m=o?[h.getInfiniteList(b.resource)]:[];a.forEach(l=>{T.push(h.getList(l)),m.push(h.getInfiniteList(l))});let P=Array.isArray(E)?E:[E];P.forEach(l=>{let{id:f}=l.data,d=o?[h.getOne(b.resource,f)]:[];a.forEach(x=>{d.push(h.getOne(x,f))}),_({queryClient:p,data:l.data||{},queryKeysOne:d.map(x=>[...x,{}])})}),J({data:P.map(l=>_optionalChain([l, 'optionalAccess', _46 => _46.data])||{}),queryClient:p,cacheAddItemTo:s,queryKeysInfiniteList:m,queryKeysList:T}),i&&L({queryClient:p,queryKeys:[...T,...m]})}_optionalChain([t, 'optionalAccess', _47 => _47.onSuccess])&&t.onSuccess(...D)}});return{mutation:c,create:({resourceParams:D,...E})=>{y({...E,resource:{path:e,params:D}})}}};var Qa=({queryOptions:e,resource:t,params:a={},apiClientParams:o})=>{let{apiUrl:s,apiClient:i,apiEnsureTrailingSlash:n}=C();return _reactquery.useQuery.call(void 0, {...e,queryKey:["query-data",t.path,t.params,a,..._optionalChain([e, 'optionalAccess', _48 => _48.queryKey])?e.queryKey:[]],queryFn:async({queryKey:u})=>{let p={resource:t,params:a,queryKey:u},y=`${s}/${g(p.resource,n)}`;return _optionalChain([e, 'optionalAccess', _49 => _49.queryFn])?await _optionalChain([e, 'optionalAccess', _50 => _50.queryFn, 'call', _51 => _51({apiClient:i,apiUrl:s,variables:p,url:y})]):await i({url:y,method:"GET",params:a,...o})}})};var ba=({resourcePath:e,mutationOptions:t})=>{let{apiUrl:a,apiClient:o,apiEnsureTrailingSlash:s}=C(),{mutate:i,...n}=_reactquery.useMutation.call(void 0, {...t,mutationKey:["mutate-data",e,..._optionalChain([t, 'optionalAccess', _52 => _52.mutationKey])?t.mutationKey:[]],mutationFn:async u=>{let p=`${a}/${g(u.resource,s)}`;return _optionalChain([t, 'optionalAccess', _53 => _53.mutationFn])?await _optionalChain([t, 'optionalAccess', _54 => _54.mutationFn, 'call', _55 => _55({apiClient:o,apiUrl:a,variables:u,url:p})]):await o({url:p,data:u.data,...u.apiClientParams})}});return{mutation:n,mutate:async({resourceParams:u,...p})=>{i({...p,resource:{path:e,params:u}})}}};exports.CustomError = O; exports.RQWrapper = ot; exports.ToastBar = We; exports.addItemToQueryCache = _; exports.addItemsToListQueryCache = J; exports.deleteItemsFromQueryCache = Y; exports.fetcher = $; exports.getUrlFromResource = g; exports.helpersQueryKeys = h; exports.invalidateMatchingQueries = Lt; exports.invalidateQueries = L; exports.resolveToastValue = ze; exports.toast = q; exports.updateItemsFromQueryCache = Z; exports.useCreate = fa; exports.useDataMutate = ba; exports.useDataQuery = Qa; exports.useDeleteMany = Zt; exports.useDeleteOne = Xt; exports.useGetInfiniteList = ht; exports.useGetList = ct; exports.useGetOne = Et; exports.useRQWrapperContext = C; exports.useUpdateMany = ya; exports.useUpdateOne = ua;
//# sourceMappingURL=index.js.map