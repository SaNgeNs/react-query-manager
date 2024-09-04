"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _createStarExport(obj) { Object.keys(obj) .filter((key) => key !== "default" && key !== "__esModule") .forEach((key) => { if (exports.hasOwnProperty(key)) { return; } Object.defineProperty(exports, key, {enumerable: true, configurable: true, get: () => obj[key]}); }); } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _reactquery = require('@tanstack/react-query'); _createStarExport(_reactquery);var _eventemitter3 = require('eventemitter3'); var _eventemitter32 = _interopRequireDefault(_eventemitter3);function U(e,t){let r={...e};if(e instanceof Object&&t instanceof Object){for(let n in t)if(n in e){let a=e[n],y=t[n];typeof a==typeof y&&(Array.isArray(a)&&Array.isArray(y)||a!==null&&!Array.isArray(a)&&typeof a=="object"&&!Array.isArray(y)&&typeof y=="object"||typeof a!="object"&&typeof y!="object")&&(typeof a=="object"&&a!==null&&!Array.isArray(a)?r[n]=U(a,y):r[n]=y)}}return r}var L=async(e,t)=>{let r=t.reduce((n,a)=>n.concat(e.getQueriesData({queryKey:a})),[]);return await Promise.all(r.map(([n])=>e.cancelQueries({queryKey:n}))),r};function A(e){return e.replace(/^\/+/,"").replace(/\/+$/,"")}var B=new _eventemitter32.default,b={once:(e,t)=>{B.once(e,t)},emit:(e,t)=>{B.emit(e,t)}};var C=(e,t)=>{let r=A(e.path.replace(/{(\w+)}/g,(n,a)=>e.params[a].toString()));return t?`${r}/`:r};var _reactquerydevtools = require('@tanstack/react-query-devtools');var _react = require('react'); var _react2 = _interopRequireDefault(_react);var S=class e extends Error{constructor(r,n,a){super(r);this.message=r;this.status=n;this.data=a;Object.setPrototypeOf(this,e.prototype),this.name=this.constructor.name,typeof Error.captureStackTrace=="function"?Error.captureStackTrace(this,this.constructor):this.stack=new Error(r).stack,this.stack=new Error().stack,console.error(this.message,this)}};var X=e=>{if(e!==null&&typeof e=="object"){let t={};return Object.entries(e).forEach(([n,a])=>{(a||typeof a=="boolean"||typeof a=="number")&&(t[n]=a)}),t}return{}};function q(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var $=e=>{let{onSuccess:t,onError:r}=e,n=e.data instanceof FormData,a=(()=>{let s=e.url;if(e.params){let o=X(e.params);if(e.queryParamsSerializer)s+=`?${e.queryParamsSerializer(e.params)}`;else if(Object.keys(o).length>0){let c=[];for(let P in o)o.hasOwnProperty(P)&&(Array.isArray(o[P])?o[P].forEach(F=>{c.push(`${q(P)}${e.queryArrayParamStyle==="indexedArray"?"[]":""}=${q(F)}`)}):c.push(`${q(P)}=${q(o[P])}`));s+=`?${c.join("&")}`}}let[i,p]=s.split("?");return`${i}${p?`?${p}`:""}`})(),y=n?e.data:e.data?JSON.stringify(e.data):"",u={method:e.method,headers:{...!n&&{"Content-Type":"application/json"},...e.authorization&&{Authorization:e.authorization},...e.headers},...y&&{body:y},...e.options};return fetch(a,u).then(async s=>{let i=await(async()=>{try{let o=_optionalChain([s, 'access', _2 => _2.headers, 'access', _3 => _3.get, 'call', _4 => _4("Content-Type"), 'optionalAccess', _5 => _5.toLowerCase, 'call', _6 => _6()])||"";return o.includes("application/json")?await s.json():o.includes("text/plain")||o.includes("text/csv")||o.includes("application/xml")||o.includes("text/xml")||o.includes("application/javascript")||o.includes("text/html")?await s.text():o.includes("multipart/form-data")?await s.formData():await s.blob()}catch(o){throw console.error("Error handling response:",o),o}})(),p={};return s.headers.forEach((o,c)=>{p[c]=o}),{status:s.status,statusText:s.statusText,headers:p,data:i}}).then(s=>{if(s.status<200||s.status>=300){let i=new S(`Request failed with status code: ${s.status}`,s.status,s.data);return r&&r(i,e),Promise.reject(i)}return t&&t(s,e),Promise.resolve(s)}).catch(s=>Promise.reject(new S(s.message)))};var _headless = require('react-hot-toast/headless'); var _headless2 = _interopRequireDefault(_headless);var te=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})();function re({id:e,className:t,style:r,onHeightUpdate:n,children:a}){let y=_react.useCallback.call(void 0, u=>{if(u){let s=()=>{let{height:i}=u.getBoundingClientRect();n(e,i)};s(),new MutationObserver(s).observe(u,{subtree:!0,childList:!0,characterData:!0})}},[e,n]);return _react2.default.createElement("div",{ref:y,className:t,style:r},a)}var ae=(e,t)=>{let r=e.includes("top"),n=r?{top:0}:{bottom:0},a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:te()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...n,...a}},O=16;function j({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:n,children:a,containerStyle:y,containerClassName:u}){let{toasts:s,handlers:i}=_headless.useToaster.call(void 0, r);return _react2.default.createElement("div",{style:{position:"fixed",zIndex:9999,top:O,left:O,right:O,bottom:O,pointerEvents:"none",...y},className:u,onMouseEnter:i.startPause,onMouseLeave:i.endPause},s.map(p=>{let o=p.position||t,c={...p,position:o},P=i.calculateOffset(c,{reverseOrder:e,gutter:n,defaultPosition:t}),F=ae(o,P);return _react2.default.createElement(re,{id:c.id,key:c.id,onHeightUpdate:i.updateHeight,style:{...F,pointerEvents:"auto"}},c.type==="custom"?_headless.resolveValue.call(void 0, p.message,c):a?a(c):_react2.default.createElement("div",{style:{display:p.visible?"flex":"none"}},_headless.resolveValue.call(void 0, c.message,c)))}))}var _reacthottoast = require('react-hot-toast');var{remove:Be,...ne}=_headless2.default,w= exports.toast =Object.assign((...e)=>_headless2.default.call(void 0, ...e),ne),Ve= exports.ToastBar =_reacthottoast.ToastBar,je= exports.resolveToastValue =_reacthottoast.resolveValue;var z=_react.createContext.call(void 0, {apiUrl:"",apiEnsureTrailingSlash:!1,apiClient:$,toastUndo:()=>{}}),R= exports.useRQWrapperContext =()=>_react.useContext.call(void 0, z);function Xe({children:e,config:t={},apiUrl:r,apiClient:n=$,apiEnsureTrailingSlash:a=!1,apiAuthorization:y,apiHeaders:u,apiOnSuccess:s,apiOnError:i,isDevTools:p,devToolsOptions:o,toast:c}){let P=_react.useMemo.call(void 0, ()=>new (0, _reactquery.QueryClient)({...t,defaultOptions:{..._optionalChain([t, 'optionalAccess', _7 => _7.defaultOptions]),queries:{gcTime:3e5,staleTime:3e5,retry:!1,..._optionalChain([t, 'optionalAccess', _8 => _8.defaultOptions, 'optionalAccess', _9 => _9.queries])}}}),[]),F=_react.useCallback.call(void 0, m=>{let T=y?y():"",d=u?u():{},D=(...g)=>{s&&s(...g),m.onSuccess&&m.onSuccess(...g)},h=(...g)=>{i&&i(...g),m.onError&&m.onError(...g)};return n({...m,headers:m.headers?{...d,...m.headers}:d,authorization:m.authorization||T,onSuccess:D,onError:h})},[]),Q=_react.useCallback.call(void 0, m=>{let T=!1;w.dismiss();let d=()=>{T=!0,b.emit("end",!0),w.dismiss()},D=_optionalChain([c, 'optionalAccess', _10 => _10.customUndoContent])?_optionalChain([c, 'optionalAccess', _11 => _11.customUndoContent, 'call', _12 => _12({message:m.message,onUndo:d,type:m.type})]):null;w.success(h=>(!h.visible&&!T&&(T=!0,b.emit("end",!1)),D||_react2.default.createElement(_react2.default.Fragment,null,m.message,_react2.default.createElement("span",{style:{marginLeft:"10px",cursor:"pointer"},onClick:d,role:"button",tabIndex:0,"aria-label":"Undo",title:"Undo"},"UNDO"))),{duration:_optionalChain([c, 'optionalAccess', _13 => _13.globalProps, 'optionalAccess', _14 => _14.toastOptions, 'optionalAccess', _15 => _15.duration])||5e3})},[]),l=_react.useMemo.call(void 0, ()=>({apiUrl:A(r),apiClient:F,apiEnsureTrailingSlash:a,toastUndo:Q}),[r,F,Q,a]);return _react2.default.createElement(_reactquery.QueryClientProvider,{client:P},_react2.default.createElement(j,{..._optionalChain([c, 'optionalAccess', _16 => _16.globalProps])},_optionalChain([c, 'optionalAccess', _17 => _17.wrapper])),_react2.default.createElement(z.Provider,{value:l},e),p&&_react2.default.createElement(_reactquerydevtools.ReactQueryDevtools,{buttonPosition:"bottom-right",initialIsOpen:!1,...o}))}var at=({queryOptions:e,resource:t,params:r={},apiClientParams:n})=>{let{apiUrl:a,apiClient:y,apiEnsureTrailingSlash:u}=R();return _reactquery.useQuery.call(void 0, {...e,queryKey:["get-list",t.path,t.params,r,..._optionalChain([e, 'optionalAccess', _18 => _18.queryKey])?e.queryKey:[]],queryFn:async({queryKey:i})=>{let p={resource:t,params:r,queryKey:i},o=`${a}/${C(p.resource,u)}`;return _optionalChain([e, 'optionalAccess', _19 => _19.queryFn])?await _optionalChain([e, 'optionalAccess', _20 => _20.queryFn, 'call', _21 => _21({apiClient:y,variables:p,url:o})]):await y({url:o,method:"GET",params:r,...n})}})};var pt=({queryOptions:e,resource:t,params:r={},apiClientParams:n,pagination:a})=>{let{apiUrl:y,apiClient:u,apiEnsureTrailingSlash:s}=R();return _reactquery.useInfiniteQuery.call(void 0, {initialPageParam:1,getNextPageParam:(...p)=>{let o=p[0],c=Number(p[2]);if(_optionalChain([o, 'optionalAccess', _22 => _22.data, 'optionalAccess', _23 => _23.length]))return c+1},getPreviousPageParam:(...p)=>{let o=Number(p[2]);if(!(o<=1))return o-1},...e,queryKey:["get-infinite-list",t.path,t.params,a,r,..._optionalChain([e, 'optionalAccess', _24 => _24.queryKey])?e.queryKey:[]],queryFn:async({queryKey:p,pageParam:o})=>{let c={resource:t,params:{...r,[a.page[0]]:o,[a.per_page[0]]:a.per_page[1]},queryKey:p},P=`${y}/${C(c.resource,s)}`;return _optionalChain([e, 'optionalAccess', _25 => _25.queryFn])?await _optionalChain([e, 'optionalAccess', _26 => _26.queryFn, 'call', _27 => _27({apiClient:u,variables:c,url:P})]):await u({url:P,method:"GET",params:c.params,...n})}})};var Tt=({resource:e,id:t,queryOptions:r,params:n={},apiClientParams:a})=>{let{apiUrl:y,apiClient:u,apiEnsureTrailingSlash:s}=R();return _reactquery.useQuery.call(void 0, {...r,queryKey:["get-one",e.path,e.params,String(t),n,..._optionalChain([r, 'optionalAccess', _28 => _28.queryKey])?r.queryKey:[]],queryFn:async({queryKey:p})=>{let o={id:t,resource:e,params:n,queryKey:p},c=`${y}/${C(o.resource,!0)}`;return _optionalChain([r, 'optionalAccess', _29 => _29.queryFn])?await _optionalChain([r, 'optionalAccess', _30 => _30.queryFn, 'call', _31 => _31({apiClient:u,variables:o,url:c})]):await u({url:`${c}${o.id}${s?"/":""}`,method:"GET",params:n,...a})}})};var N=({queryClient:e,ids:t,queryKeysOne:r,queryKeysList:n,queryKeysInfiniteList:a})=>{let y=u=>!u||!(u.data instanceof Array)?u:{...u,data:u.data.filter(s=>!t.some(i=>String(i)===String(s.id)))};r&&r.forEach(u=>{e.removeQueries({queryKey:u})}),n&&n.forEach(u=>{e.setQueriesData({queryKey:u},y)}),a&&a.forEach(u=>{e.setQueriesData({queryKey:u},s=>s&&{...s,pages:s.pages.map(y)})})},G= exports.updateItemsFromQueryCache =({queryClient:e,data:t,ids:r,queryKeysOne:n,queryKeysList:a,queryKeysInfiniteList:y})=>{let u=s=>!s||!(s.data instanceof Array)?s:{...s,data:s.data.map(i=>r.some(p=>String(p)===String(i.id))?U(i,t):i)};n&&n.forEach(s=>{e.setQueriesData({queryKey:s},i=>!i||!(i.data instanceof Object)||!(t instanceof Object)?i:{...i,data:U(i.data,t)})}),a&&a.forEach(s=>{e.setQueriesData({queryKey:s},u)}),y&&y.forEach(s=>{e.setQueriesData({queryKey:s},i=>i&&{...i,pages:i.pages.map(u)})})},f= exports.helpersQueryKeys ={getOne:(e,t)=>["get-one",e.path,e.params,String(t)],getOneArray:(e,t)=>t.map(r=>["get-one",e.path,e.params,String(r)]),getList:e=>["get-list",e.path,e.params],getInfiniteList:e=>["get-infinite-list",e.path,e.params]};var M=({queryClient:e,queryKeys:t})=>{t.forEach(r=>{e.invalidateQueries({queryKey:r})})},H=({queryClient:e,queryKeys:t,data:r})=>{t.forEach(n=>{e.setQueryData(n,r)})};var _=({resourcePath:e,mutationOptions:t,mode:r={optimistic:!0,undoable:!0},extraResources:n=[],type:a="many"})=>{let{apiUrl:y,apiClient:u,apiEnsureTrailingSlash:s,toastUndo:i}=R(),p=_reactquery.useQueryClient.call(void 0, ),o=_react.useRef.call(void 0, []),c=()=>{o.current.forEach(([l,m])=>{p.setQueryData(l,m)})},{mutate:P,...F}=_reactquery.useMutation.call(void 0, {...t,mutationKey:[a==="many"?"delete-many":"delete-one",e,..._optionalChain([t, 'optionalAccess', _32 => _32.mutationKey])?t.mutationKey:[]],mutationFn:async l=>{let m=`${y}/${C(l.resource,!0)}`;if(_optionalChain([t, 'optionalAccess', _33 => _33.mutationFn]))return await _optionalChain([t, 'optionalAccess', _34 => _34.mutationFn, 'call', _35 => _35({apiClient:u,variables:l,url:m})]);let T=a==="many"?l.ids:[l.id],d=await Promise.allSettled(T.map(h=>u({url:`${m}${h}${s?"/":""}`,method:"DELETE",...l.apiClientParams}))),D=[];return d.forEach(h=>{if(h.status==="fulfilled")D.push(h.value);else throw h.reason}),a==="many"?D:D[0]},onSuccess:(...l)=>{let m=l[1],T=[f.getList(m.resource),f.getInfiniteList(m.resource)];n.forEach(d=>{T.push(f.getList(d)),T.push(f.getInfiniteList(d))}),M({queryClient:p,queryKeys:T}),_optionalChain([t, 'optionalAccess', _36 => _36.onSuccess])&&t.onSuccess(...l)},onError:(...l)=>{_optionalChain([t, 'optionalAccess', _37 => _37.onError])&&t.onError(...l),c()}});return{mutation:F,delete:async({resourceParams:l,undoMessage:m,...T})=>{let d={path:e,params:l},D=a==="many"?T.ids:[T.id];if(r.optimistic){let h=f.getOneArray(d,D),g=[f.getList(d)],x=[f.getInfiniteList(d)];n.forEach(K=>{h.push(...f.getOneArray(K,D)),g.push(f.getList(K)),x.push(f.getInfiniteList(K))}),o.current=await L(p,[...h,...g,...x]),N({queryClient:p,ids:D,queryKeysOne:h,queryKeysList:g,queryKeysInfiniteList:x})}if(r.undoable){let h=D.length>1;b.once("end",g=>{g?c():P({...T,resource:d})}),i({message:m||`Element${h?"s":""} deleted`,type:h?"delete-many":"delete-one"})}else P({...T,resource:d})}}},Kt= exports.useDeleteOne =e=>_({...e,type:"one"}),bt= exports.useDeleteMany =e=>_({...e,type:"many"});var J=({resourcePath:e,mutationOptions:t,mode:r={optimistic:!0,undoable:!0},extraResources:n=[],type:a="many"})=>{let{apiUrl:y,apiClient:u,apiEnsureTrailingSlash:s,toastUndo:i}=R(),p=_reactquery.useQueryClient.call(void 0, ),o=_react.useRef.call(void 0, []),c=()=>{o.current.forEach(([l,m])=>{p.setQueryData(l,m)})},{mutate:P,...F}=_reactquery.useMutation.call(void 0, {...t,mutationKey:[a==="many"?"update-many":"update-one",e,..._optionalChain([t, 'optionalAccess', _38 => _38.mutationKey])?t.mutationKey:[]],mutationFn:async l=>{let m=`${y}/${C(l.resource,!0)}`;if(_optionalChain([t, 'optionalAccess', _39 => _39.mutationFn]))return await _optionalChain([t, 'optionalAccess', _40 => _40.mutationFn, 'call', _41 => _41({apiClient:u,variables:l,url:m})]);let T=a==="many"?l.ids:[l.id],d=await Promise.allSettled(T.map(h=>u({url:`${m}${h}${s?"/":""}`,method:"PATCH",data:l.data,...l.apiClientParams}))),D=[];return d.forEach(h=>{if(h.status==="fulfilled")D.push(h.value);else throw h.reason}),a==="many"?D:D[0]},onSuccess:(...l)=>{let m=l[1];if(!r.optimistic){let T=a==="many"?m.ids:[m.id],d=[...f.getOneArray(m.resource,T),f.getList(m.resource),f.getInfiniteList(m.resource)];n.forEach(D=>{d.push(...f.getOneArray(D,T)),d.push(f.getList(D)),d.push(f.getInfiniteList(D))}),M({queryClient:p,queryKeys:d})}_optionalChain([t, 'optionalAccess', _42 => _42.onSuccess])&&t.onSuccess(...l)},onError:(...l)=>{_optionalChain([t, 'optionalAccess', _43 => _43.onError])&&t.onError(...l),c()}});return{mutation:F,update:async({resourceParams:l,undoMessage:m,...T})=>{let d={path:e,params:l},D=a==="many"?T.ids:[T.id];if(r.optimistic){let h=f.getOneArray(d,D),g=[f.getList(d)],x=[f.getInfiniteList(d)];n.forEach(K=>{h.push(...f.getOneArray(K,D)),g.push(f.getList(K)),x.push(f.getInfiniteList(K))}),o.current=await L(p,[...h,...g,...x]),G({queryClient:p,data:T.data,ids:D,queryKeysOne:h,queryKeysList:g,queryKeysInfiniteList:x})}if(r.undoable){let h=D.length>1;b.once("end",g=>{g?c():P({...T,resource:d})}),i({message:m||`Element${h?"s":""} updated`,type:h?"update-many":"update-one"})}else P({...T,resource:d})}}},It= exports.useUpdateOne =e=>J({...e,type:"one"}),wt= exports.useUpdateMany =e=>J({...e,type:"many"});var Wt=({resourcePath:e,mutationOptions:t,extraResources:r=[]})=>{let{apiUrl:n,apiClient:a,apiEnsureTrailingSlash:y}=R(),u=_reactquery.useQueryClient.call(void 0, ),{mutate:s,...i}=_reactquery.useMutation.call(void 0, {...t,mutationKey:["create",e,..._optionalChain([t, 'optionalAccess', _44 => _44.mutationKey])?t.mutationKey:[]],mutationFn:async o=>{let c=`${n}/${C(o.resource,y)}`;return _optionalChain([t, 'optionalAccess', _45 => _45.mutationFn])?await _optionalChain([t, 'optionalAccess', _46 => _46.mutationFn, 'call', _47 => _47({apiClient:a,variables:o,url:c})]):await a({url:c,method:"POST",data:o.data,...o.apiClientParams})},onSuccess:(...o)=>{let c=o[0],P=o[1],{id:F}=c.data,Q=[f.getOne(P.resource,F)],l=[f.getList(P.resource)],m=[f.getInfiniteList(P.resource)];r.forEach(T=>{Q.push(f.getOne(T,F)),l.push(f.getList(T)),m.push(f.getInfiniteList(T))}),H({queryClient:u,queryKeys:Q.map(T=>[...T,{}]),data:o[0]}),M({queryClient:u,queryKeys:[...l,...m]}),_optionalChain([t, 'optionalAccess', _48 => _48.onSuccess])&&t.onSuccess(...o)}});return{mutation:i,create:({resourceParams:o,...c})=>{s({...c,resource:{path:e,params:o}})}}};var _t=({queryOptions:e,resource:t,params:r={},apiClientParams:n})=>{let{apiUrl:a,apiClient:y,apiEnsureTrailingSlash:u}=R();return _reactquery.useQuery.call(void 0, {...e,queryKey:["query-data",t.path,t.params,r,..._optionalChain([e, 'optionalAccess', _49 => _49.queryKey])?e.queryKey:[]],queryFn:async({queryKey:i})=>{let p={resource:t,params:r,queryKey:i},o=`${a}/${C(p.resource,u)}`;return _optionalChain([e, 'optionalAccess', _50 => _50.queryFn])?await _optionalChain([e, 'optionalAccess', _51 => _51.queryFn, 'call', _52 => _52({apiClient:y,variables:p,url:o})]):await y({url:o,method:"GET",params:r,...n})}})};var er=({resourcePath:e,mutationOptions:t})=>{let{apiUrl:r,apiClient:n,apiEnsureTrailingSlash:a}=R(),{mutate:y,...u}=_reactquery.useMutation.call(void 0, {...t,mutationKey:["mutate-data",e,..._optionalChain([t, 'optionalAccess', _53 => _53.mutationKey])?t.mutationKey:[]],mutationFn:async i=>{let p=`${r}/${C(i.resource,a)}`;return _optionalChain([t, 'optionalAccess', _54 => _54.mutationFn])?await _optionalChain([t, 'optionalAccess', _55 => _55.mutationFn, 'call', _56 => _56({apiClient:n,variables:i,url:p})]):await n({url:p,data:i.data,...i.apiClientParams})}});return{mutation:u,mutate:async({resourceParams:i,...p})=>{y({...p,resource:{path:e,params:i}})}}};exports.CustomError = S; exports.RQWrapper = Xe; exports.ToastBar = Ve; exports.deleteItemsFromQueryCache = N; exports.fetcher = $; exports.getUrlFromResource = C; exports.helpersQueryKeys = f; exports.resolveToastValue = je; exports.toast = w; exports.updateItemsFromQueryCache = G; exports.useCreate = Wt; exports.useDataMutate = er; exports.useDataQuery = _t; exports.useDeleteMany = bt; exports.useDeleteOne = Kt; exports.useGetInfiniteList = pt; exports.useGetList = at; exports.useGetOne = Tt; exports.useRQWrapperContext = R; exports.useUpdateMany = wt; exports.useUpdateOne = It;
//# sourceMappingURL=index.js.map