"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _createStarExport(obj) { Object.keys(obj) .filter((key) => key !== "default" && key !== "__esModule") .forEach((key) => { if (exports.hasOwnProperty(key)) { return; } Object.defineProperty(exports, key, {enumerable: true, configurable: true, get: () => obj[key]}); }); } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _reactquery = require('@tanstack/react-query'); _createStarExport(_reactquery);function A(e){return e.replace(/^\/+/,"").replace(/\/+$/,"")}var g=(e,t)=>{let r=A(e.path.replace(/{(\w+)}/g,(o,s)=>e.params[s].toString()));return t?`${r}/`:r};var _reactquerydevtools = require('@tanstack/react-query-devtools');var _react = require('react'); var _react2 = _interopRequireDefault(_react);var S=class e extends Error{constructor(r,o,s){super(r);this.message=r;this.status=o;this.data=s;Object.setPrototypeOf(this,e.prototype),this.name=this.constructor.name,typeof Error.captureStackTrace=="function"?Error.captureStackTrace(this,this.constructor):this.stack=new Error(r).stack,this.stack=new Error().stack,console.error(this.message,this)}};var Z=e=>{if(e!==null&&typeof e=="object"){let t={};return Object.entries(e).forEach(([o,s])=>{(s||typeof s=="boolean"||typeof s=="number")&&(t[o]=s)}),t}return{}};function U(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var V=e=>{let{onSuccess:t,onError:r}=e,o=e.data instanceof FormData,s=(()=>{let a=e.url;if(e.params){let u=Z(e.params);if(e.queryParamsSerializer)a+=`?${e.queryParamsSerializer(e.params)}`;else if(Object.keys(u).length>0){let p=[];for(let h in u)u.hasOwnProperty(h)&&(Array.isArray(u[h])?u[h].forEach(D=>{p.push(`${U(h)}${e.queryArrayParamStyle==="indexedArray"?"[]":""}=${U(D)}`)}):p.push(`${U(h)}=${U(u[h])}`));a+=`?${p.join("&")}`}}let[y,m]=a.split("?");return`${y}${m?`?${m}`:""}`})(),i=o?e.data:e.data?JSON.stringify(e.data):"",n={method:e.method,headers:{...!o&&{"Content-Type":"application/json"},...e.authorization&&{Authorization:e.authorization},...e.headers},...i&&{body:i},...e.options};return fetch(s,n).then(async a=>{let y=await(async()=>{try{let u=_optionalChain([a, 'access', _2 => _2.headers, 'access', _3 => _3.get, 'call', _4 => _4("Content-Type"), 'optionalAccess', _5 => _5.toLowerCase, 'call', _6 => _6()])||"";return u.includes("application/json")?await a.json():u.includes("text/plain")||u.includes("text/csv")||u.includes("application/xml")||u.includes("text/xml")||u.includes("application/javascript")||u.includes("text/html")?await a.text():u.includes("multipart/form-data")?await a.formData():await a.blob()}catch(u){throw console.error("Error handling response:",u),u}})(),m={};return a.headers.forEach((u,p)=>{m[p]=u}),{status:a.status,statusText:a.statusText,headers:m,data:y}}).then(a=>{if(a.status<200||a.status>=300){let y=new S(`Request failed with status code: ${a.status}`,a.status,a.data);return r&&r(y,e),Promise.reject(y)}return t&&t(a,e),Promise.resolve(a)}).catch(a=>Promise.reject(new S(a.message)))};var _headless = require('react-hot-toast/headless'); var _headless2 = _interopRequireDefault(_headless);var re=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})();function ae({id:e,className:t,style:r,onHeightUpdate:o,children:s}){let i=_react.useCallback.call(void 0, n=>{if(n){let a=()=>{let{height:y}=n.getBoundingClientRect();o(e,y)};a(),new MutationObserver(a).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return _react2.default.createElement("div",{ref:i,className:t,style:r},s)}var se=(e,t)=>{let r=e.includes("top"),o=r?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:re()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...o,...s}},O=16;function v({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:o,children:s,containerStyle:i,containerClassName:n}){let{toasts:a,handlers:y}=_headless.useToaster.call(void 0, r);return _react2.default.createElement("div",{style:{position:"fixed",zIndex:9999,top:O,left:O,right:O,bottom:O,pointerEvents:"none",...i},className:n,onMouseEnter:y.startPause,onMouseLeave:y.endPause},a.map(m=>{let u=m.position||t,p={...m,position:u},h=y.calculateOffset(p,{reverseOrder:e,gutter:o,defaultPosition:t}),D=se(u,h);return _react2.default.createElement(ae,{id:p.id,key:p.id,onHeightUpdate:y.updateHeight,style:{...D,pointerEvents:"auto"}},p.type==="custom"?_headless.resolveValue.call(void 0, m.message,p):s?s(p):_react2.default.createElement("div",{style:{display:m.visible?"flex":"none"}},_headless.resolveValue.call(void 0, p.message,p)))}))}var _reacthottoast = require('react-hot-toast');var{remove:Ve,...ie}=_headless2.default,I= exports.toast =Object.assign((...e)=>_headless2.default.call(void 0, ...e),ie),je= exports.ToastBar =_reacthottoast.ToastBar,ve= exports.resolveToastValue =_reacthottoast.resolveValue;var _eventemitter3 = require('eventemitter3'); var _eventemitter32 = _interopRequireDefault(_eventemitter3);var W=new _eventemitter32.default,E={once:(e,t)=>{W.once(e,t)},emit:(e,t)=>{W.emit(e,t)}};var G=_react.createContext.call(void 0, {apiUrl:"",apiEnsureTrailingSlash:!1,apiClient:V,toastUndo:()=>{}}),R= exports.useRQWrapperContext =()=>_react.useContext.call(void 0, G);function rt({children:e,config:t={},apiUrl:r,apiClient:o=V,apiEnsureTrailingSlash:s=!1,apiAuthorization:i,apiHeaders:n,apiOnSuccess:a,apiOnError:y,isDevTools:m,devToolsOptions:u,toast:p}){let h=_react.useMemo.call(void 0, ()=>new (0, _reactquery.QueryClient)({...t,defaultOptions:{..._optionalChain([t, 'optionalAccess', _7 => _7.defaultOptions]),queries:{gcTime:3e5,staleTime:3e5,retry:!1,..._optionalChain([t, 'optionalAccess', _8 => _8.defaultOptions, 'optionalAccess', _9 => _9.queries])}}}),[]),D=_react.useCallback.call(void 0, c=>{let T=i?i():"",l=n?n():{},P=(...f)=>{a&&a(...f),c.onSuccess&&c.onSuccess(...f)},Q=(...f)=>{y&&y(...f),c.onError&&c.onError(...f)};return o({...c,headers:c.headers?{...l,...c.headers}:l,authorization:c.authorization||T,onSuccess:P,onError:Q})},[]),C=_react.useCallback.call(void 0, c=>{let T=!1;I.dismiss();let l=()=>{T=!0,E.emit("end",!0),I.dismiss()},P=_optionalChain([p, 'optionalAccess', _10 => _10.customUndoContent])?_optionalChain([p, 'optionalAccess', _11 => _11.customUndoContent, 'call', _12 => _12({message:c.message,onUndo:l,type:c.type})]):null;I.success(Q=>(!Q.visible&&!T&&(T=!0,E.emit("end",!1)),P||_react2.default.createElement(_react2.default.Fragment,null,c.message,_react2.default.createElement("span",{style:{marginLeft:"10px",cursor:"pointer"},onClick:l,role:"button",tabIndex:0,"aria-label":"Undo",title:"Undo"},"UNDO"))),{duration:_optionalChain([p, 'optionalAccess', _13 => _13.globalProps, 'optionalAccess', _14 => _14.toastOptions, 'optionalAccess', _15 => _15.duration])||5e3})},[]),M=_react.useMemo.call(void 0, ()=>({apiUrl:A(r),apiClient:D,apiEnsureTrailingSlash:s,toastUndo:C}),[r,D,C,s]);return _react2.default.createElement(_reactquery.QueryClientProvider,{client:h},_react2.default.createElement(v,{..._optionalChain([p, 'optionalAccess', _16 => _16.globalProps])},_optionalChain([p, 'optionalAccess', _17 => _17.wrapper])),_react2.default.createElement(G.Provider,{value:M},e),m&&_react2.default.createElement(_reactquerydevtools.ReactQueryDevtools,{buttonPosition:"bottom-right",initialIsOpen:!1,...u}))}var it=({queryOptions:e,resource:t,params:r={},apiClientParams:o})=>{let{apiUrl:s,apiClient:i,apiEnsureTrailingSlash:n}=R();return _reactquery.useQuery.call(void 0, {...e,queryKey:["get-list",t.path,t.params,r,..._optionalChain([e, 'optionalAccess', _18 => _18.queryKey])?e.queryKey:[]],queryFn:async({queryKey:y})=>{let m={resource:t,params:r,queryKey:y},u=`${s}/${g(m.resource,n)}`;return _optionalChain([e, 'optionalAccess', _19 => _19.queryFn])?await _optionalChain([e, 'optionalAccess', _20 => _20.queryFn, 'call', _21 => _21({apiClient:i,variables:m,url:u})]):await i({url:u,method:"GET",params:r,...o})}})};var lt=({queryOptions:e,resource:t,params:r={},apiClientParams:o,pagination:s})=>{let{apiUrl:i,apiClient:n,apiEnsureTrailingSlash:a}=R();return _reactquery.useInfiniteQuery.call(void 0, {initialPageParam:1,getNextPageParam:(...m)=>{let u=m[0],p=Number(m[2]);if(_optionalChain([u, 'optionalAccess', _22 => _22.data, 'optionalAccess', _23 => _23.length]))return p+1},getPreviousPageParam:(...m)=>{let u=Number(m[2]);if(!(u<=1))return u-1},...e,queryKey:["get-infinite-list",t.path,t.params,s,r,..._optionalChain([e, 'optionalAccess', _24 => _24.queryKey])?e.queryKey:[]],queryFn:async({queryKey:m,pageParam:u})=>{let p={resource:t,params:{...r,[s.page[0]]:u,[s.per_page[0]]:s.per_page[1]},queryKey:m},h=`${i}/${g(p.resource,a)}`;return _optionalChain([e, 'optionalAccess', _25 => _25.queryFn])?await _optionalChain([e, 'optionalAccess', _26 => _26.queryFn, 'call', _27 => _27({apiClient:n,variables:p,url:h})]):await n({url:h,method:"GET",params:p.params,...o})}})};var Pt=({resource:e,id:t,queryOptions:r,params:o={},apiClientParams:s})=>{let{apiUrl:i,apiClient:n,apiEnsureTrailingSlash:a}=R();return _reactquery.useQuery.call(void 0, {...r,queryKey:["get-one",e.path,e.params,String(t),o,..._optionalChain([r, 'optionalAccess', _28 => _28.queryKey])?r.queryKey:[]],queryFn:async({queryKey:m})=>{let u={id:t,resource:e,params:o,queryKey:m},p=`${i}/${g(u.resource,!0)}`;return _optionalChain([r, 'optionalAccess', _29 => _29.queryFn])?await _optionalChain([r, 'optionalAccess', _30 => _30.queryFn, 'call', _31 => _31({apiClient:n,variables:u,url:p})]):await n({url:`${p}${u.id}${a?"/":""}`,method:"GET",params:o,...s})}})};var H=({queryClient:e,data:t,queryKeysOne:r,queryKeysList:o,queryKeysInfiniteList:s})=>{let i=n=>!n||!(n.data instanceof Array)?n:{...n,data:[t,...n.data]};r&&r.forEach(n=>{e.setQueryData(n,t)}),o&&o.forEach(n=>{e.setQueriesData({queryKey:n},i)}),s&&s.forEach(n=>{e.setQueriesData({queryKey:n},a=>a&&{...a,pages:a.pages.map(i)})})};var _=({queryClient:e,ids:t,queryKeysOne:r,queryKeysList:o,queryKeysInfiniteList:s})=>{let i=n=>!n||!(n.data instanceof Array)?n:{...n,data:n.data.filter(a=>!t.some(y=>String(y)===String(a.id)))};r&&r.forEach(n=>{e.removeQueries({queryKey:n})}),o&&o.forEach(n=>{e.setQueriesData({queryKey:n},i)}),s&&s.forEach(n=>{e.setQueriesData({queryKey:n},a=>a&&{...a,pages:a.pages.map(i)})})};var d={getOne:(e,t)=>["get-one",e.path,e.params,String(t)],getOneArray:(e,t)=>t.map(r=>["get-one",e.path,e.params,String(r)]),getList:e=>["get-list",e.path,e.params],getInfiniteList:e=>["get-infinite-list",e.path,e.params],getDataQuery:e=>["query-data",e.path,e.params]};function w(e,t){if(typeof e!=typeof t)return!1;if(e instanceof Object&&t instanceof Object){let r=Object.keys(e),o=Object.keys(t);if(r.length!==o.length)return!1;for(let s of r){let i=e[s],n=t[s];if(i!==n&&!w(i,n))return!1}return!0}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r]&&!w(e[r],t[r]))return!1;return!0}return e===t}var xt=({queryClient:e,queryKeys:t})=>{e.invalidateQueries({predicate:r=>{let o=r.queryKey;return t.some(s=>s.every(i=>o.some(n=>w(n,i))))}})};var L=({queryClient:e,queryKeys:t})=>{t.forEach(r=>{e.invalidateQueries({queryKey:r})})};function $(e,t){let r={...e};if(e instanceof Object&&t instanceof Object){for(let o in t)if(o in e){let s=e[o],i=t[o];typeof s==typeof i&&(Array.isArray(s)&&Array.isArray(i)||s!==null&&!Array.isArray(s)&&typeof s=="object"&&!Array.isArray(i)&&typeof i=="object"||typeof s!="object"&&typeof i!="object")&&(typeof s=="object"&&s!==null&&!Array.isArray(s)?r[o]=$(s,i):r[o]=i)}}return r}var J=({queryClient:e,data:t,ids:r,queryKeysOne:o,queryKeysList:s,queryKeysInfiniteList:i})=>{let n=a=>!a||!(a.data instanceof Array)?a:{...a,data:a.data.map(y=>r.some(m=>String(m)===String(y.id))?$(y,t):y)};o&&o.forEach(a=>{e.setQueriesData({queryKey:a},y=>!y||!(y.data instanceof Object)||!(t instanceof Object)?y:{...y,data:$(y.data,t)})}),s&&s.forEach(a=>{e.setQueriesData({queryKey:a},n)}),i&&i.forEach(a=>{e.setQueriesData({queryKey:a},y=>y&&{...y,pages:y.pages.map(n)})})};var B=async(e,t)=>{let r=t.reduce((o,s)=>o.concat(e.getQueriesData({queryKey:s})),[]);return await Promise.all(r.map(([o])=>e.cancelQueries({queryKey:o}))),r};var Y=({resourcePath:e,mutationOptions:t,mode:r={optimistic:!0,undoable:!0},extraResources:o=[],shouldUpdateCurrentResource:s=!0,type:i="many"})=>{let{apiUrl:n,apiClient:a,apiEnsureTrailingSlash:y,toastUndo:m}=R(),u=_reactquery.useQueryClient.call(void 0, ),p=_react.useRef.call(void 0, []),h=()=>{p.current.forEach(([c,T])=>{u.setQueryData(c,T)})},{mutate:D,...C}=_reactquery.useMutation.call(void 0, {...t,mutationKey:[i==="many"?"delete-many":"delete-one",e,..._optionalChain([t, 'optionalAccess', _32 => _32.mutationKey])?t.mutationKey:[]],mutationFn:async c=>{let T=`${n}/${g(c.resource,!0)}`;if(_optionalChain([t, 'optionalAccess', _33 => _33.mutationFn]))return await _optionalChain([t, 'optionalAccess', _34 => _34.mutationFn, 'call', _35 => _35({apiClient:a,variables:c,url:T})]);let l=i==="many"?c.ids:[c.id],P=await Promise.allSettled(l.map(f=>a({url:`${T}${f}${y?"/":""}`,method:"DELETE",...c.apiClientParams}))),Q=[];return P.forEach(f=>{if(f.status==="fulfilled")Q.push(f.value);else throw f.reason}),i==="many"?Q:Q[0]},onSuccess:(...c)=>{let T=c[1],l=[d.getList(T.resource),d.getInfiniteList(T.resource)];o.forEach(P=>{l.push(d.getList(P)),l.push(d.getInfiniteList(P))}),L({queryClient:u,queryKeys:l}),_optionalChain([t, 'optionalAccess', _36 => _36.onSuccess])&&t.onSuccess(...c)},onError:(...c)=>{_optionalChain([t, 'optionalAccess', _37 => _37.onError])&&t.onError(...c),h()}});return{mutation:C,delete:async({resourceParams:c,undoMessage:T,...l})=>{let P={path:e,params:c},Q=i==="many"?l.ids:[l.id];if(r.optimistic){let f=s?d.getOneArray(P,Q):[],K=s?[d.getList(P)]:[],x=s?[d.getInfiniteList(P)]:[];o.forEach(b=>{f.push(...d.getOneArray(b,Q)),K.push(d.getList(b)),x.push(d.getInfiniteList(b))}),p.current=await B(u,[...f,...K,...x]),_({queryClient:u,ids:Q,queryKeysOne:f,queryKeysList:K,queryKeysInfiniteList:x})}if(r.undoable){let f=Q.length>1;E.once("end",K=>{K?h():D({...l,resource:P})}),m({message:T||`Element${f?"s":""} deleted`,type:f?"delete-many":"delete-one"})}else D({...l,resource:P})}}},Nt= exports.useDeleteOne =e=>Y({...e,type:"one"}),Gt= exports.useDeleteMany =e=>Y({...e,type:"many"});var X=({resourcePath:e,mutationOptions:t,mode:r={optimistic:!0,undoable:!0},extraResources:o=[],shouldUpdateCurrentResource:s=!0,type:i="many"})=>{let{apiUrl:n,apiClient:a,apiEnsureTrailingSlash:y,toastUndo:m}=R(),u=_reactquery.useQueryClient.call(void 0, ),p=_react.useRef.call(void 0, []),h=()=>{p.current.forEach(([c,T])=>{u.setQueryData(c,T)})},{mutate:D,...C}=_reactquery.useMutation.call(void 0, {...t,mutationKey:[i==="many"?"update-many":"update-one",e,..._optionalChain([t, 'optionalAccess', _38 => _38.mutationKey])?t.mutationKey:[]],mutationFn:async c=>{let T=`${n}/${g(c.resource,!0)}`;if(_optionalChain([t, 'optionalAccess', _39 => _39.mutationFn]))return await _optionalChain([t, 'optionalAccess', _40 => _40.mutationFn, 'call', _41 => _41({apiClient:a,variables:c,url:T})]);let l=i==="many"?c.ids:[c.id],P=await Promise.allSettled(l.map(f=>a({url:`${T}${f}${y?"/":""}`,method:"PATCH",data:c.data,...c.apiClientParams}))),Q=[];return P.forEach(f=>{if(f.status==="fulfilled")Q.push(f.value);else throw f.reason}),i==="many"?Q:Q[0]},onSuccess:(...c)=>{let T=c[1];if(!r.optimistic){let l=i==="many"?T.ids:[T.id],P=[...d.getOneArray(T.resource,l),d.getList(T.resource),d.getInfiniteList(T.resource)];o.forEach(Q=>{P.push(...d.getOneArray(Q,l)),P.push(d.getList(Q)),P.push(d.getInfiniteList(Q))}),L({queryClient:u,queryKeys:P})}_optionalChain([t, 'optionalAccess', _42 => _42.onSuccess])&&t.onSuccess(...c)},onError:(...c)=>{_optionalChain([t, 'optionalAccess', _43 => _43.onError])&&t.onError(...c),h()}});return{mutation:C,update:async({resourceParams:c,undoMessage:T,...l})=>{let P={path:e,params:c},Q=i==="many"?l.ids:[l.id];if(r.optimistic){let f=s?d.getOneArray(P,Q):[],K=s?[d.getList(P)]:[],x=s?[d.getInfiniteList(P)]:[];o.forEach(b=>{f.push(...d.getOneArray(b,Q)),K.push(d.getList(b)),x.push(d.getInfiniteList(b))}),p.current=await B(u,[...f,...K,...x]),J({queryClient:u,data:l.data,ids:Q,queryKeysOne:f,queryKeysList:K,queryKeysInfiniteList:x})}if(r.undoable){let f=Q.length>1;E.once("end",K=>{K?h():D({...l,resource:P})}),m({message:T||`Element${f?"s":""} updated`,type:f?"update-many":"update-one"})}else D({...l,resource:P})}}},rr= exports.useUpdateOne =e=>X({...e,type:"one"}),ar= exports.useUpdateMany =e=>X({...e,type:"many"});var yr=({resourcePath:e,mutationOptions:t,extraResources:r=[],shouldUpdateCurrentResource:o=!0})=>{let{apiUrl:s,apiClient:i,apiEnsureTrailingSlash:n}=R(),a=_reactquery.useQueryClient.call(void 0, ),{mutate:y,...m}=_reactquery.useMutation.call(void 0, {...t,mutationKey:["create",e,..._optionalChain([t, 'optionalAccess', _44 => _44.mutationKey])?t.mutationKey:[]],mutationFn:async p=>{let h=`${s}/${g(p.resource,n)}`;return _optionalChain([t, 'optionalAccess', _45 => _45.mutationFn])?await _optionalChain([t, 'optionalAccess', _46 => _46.mutationFn, 'call', _47 => _47({apiClient:i,variables:p,url:h})]):await i({url:h,method:"POST",data:p.data,...p.apiClientParams})},onSuccess:(...p)=>{let h=p[0];if(h){let D=p[1],{id:C}=h.data,M=o?[d.getOne(D.resource,C)]:[],c=o?[d.getList(D.resource)]:[],T=o?[d.getInfiniteList(D.resource)]:[];r.forEach(l=>{M.push(d.getOne(l,C)),c.push(d.getList(l)),T.push(d.getInfiniteList(l))}),H({queryClient:a,data:h,queryKeysOne:M.map(l=>[...l,{}]),queryKeysList:c,queryKeysInfiniteList:T}),L({queryClient:a,queryKeys:[...c,...T]})}_optionalChain([t, 'optionalAccess', _48 => _48.onSuccess])&&t.onSuccess(...p)}});return{mutation:m,create:({resourceParams:p,...h})=>{y({...h,resource:{path:e,params:p}})}}};var fr=({queryOptions:e,resource:t,params:r={},apiClientParams:o})=>{let{apiUrl:s,apiClient:i,apiEnsureTrailingSlash:n}=R();return _reactquery.useQuery.call(void 0, {...e,queryKey:["query-data",t.path,t.params,r,..._optionalChain([e, 'optionalAccess', _49 => _49.queryKey])?e.queryKey:[]],queryFn:async({queryKey:y})=>{let m={resource:t,params:r,queryKey:y},u=`${s}/${g(m.resource,n)}`;return _optionalChain([e, 'optionalAccess', _50 => _50.queryFn])?await _optionalChain([e, 'optionalAccess', _51 => _51.queryFn, 'call', _52 => _52({apiClient:i,variables:m,url:u})]):await i({url:u,method:"GET",params:r,...o})}})};var Qr=({resourcePath:e,mutationOptions:t})=>{let{apiUrl:r,apiClient:o,apiEnsureTrailingSlash:s}=R(),{mutate:i,...n}=_reactquery.useMutation.call(void 0, {...t,mutationKey:["mutate-data",e,..._optionalChain([t, 'optionalAccess', _53 => _53.mutationKey])?t.mutationKey:[]],mutationFn:async y=>{let m=`${r}/${g(y.resource,s)}`;return _optionalChain([t, 'optionalAccess', _54 => _54.mutationFn])?await _optionalChain([t, 'optionalAccess', _55 => _55.mutationFn, 'call', _56 => _56({apiClient:o,variables:y,url:m})]):await o({url:m,data:y.data,...y.apiClientParams})}});return{mutation:n,mutate:async({resourceParams:y,...m})=>{i({...m,resource:{path:e,params:y}})}}};exports.CustomError = S; exports.RQWrapper = rt; exports.ToastBar = je; exports.addItemFromQueryCache = H; exports.deleteItemsFromQueryCache = _; exports.fetcher = V; exports.getUrlFromResource = g; exports.helpersQueryKeys = d; exports.invalidateMatchingQueries = xt; exports.invalidateQueries = L; exports.resolveToastValue = ve; exports.toast = I; exports.updateItemsFromQueryCache = J; exports.useCreate = yr; exports.useDataMutate = Qr; exports.useDataQuery = fr; exports.useDeleteMany = Gt; exports.useDeleteOne = Nt; exports.useGetInfiniteList = lt; exports.useGetList = it; exports.useGetOne = Pt; exports.useRQWrapperContext = R; exports.useUpdateMany = ar; exports.useUpdateOne = rr;
//# sourceMappingURL=index.js.map