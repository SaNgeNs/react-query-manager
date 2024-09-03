"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _createStarExport(obj) { Object.keys(obj) .filter((key) => key !== "default" && key !== "__esModule") .forEach((key) => { if (exports.hasOwnProperty(key)) { return; } Object.defineProperty(exports, key, {enumerable: true, configurable: true, get: () => obj[key]}); }); } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _reactquery = require('@tanstack/react-query'); _createStarExport(_reactquery);var _eventemitter3 = require('eventemitter3'); var _eventemitter32 = _interopRequireDefault(_eventemitter3);function L(e,t){let s={...e};if(e instanceof Object&&t instanceof Object){for(let o in t)if(o in e){let r=e[o],m=t[o];typeof r==typeof m&&(Array.isArray(r)&&Array.isArray(m)||r!==null&&!Array.isArray(r)&&typeof r=="object"&&!Array.isArray(m)&&typeof m=="object"||typeof r!="object"&&typeof m!="object")&&(typeof r=="object"&&r!==null&&!Array.isArray(r)?s[o]=L(r,m):s[o]=m)}}return s}var U=async(e,t)=>{let s=t.reduce((o,r)=>o.concat(e.getQueriesData({queryKey:r})),[]);return await Promise.all(s.map(([o])=>e.cancelQueries({queryKey:o}))),s};function A(e){return e.replace(/^\/+/,"").replace(/\/+$/,"")}var $=new _eventemitter32.default,K={once:(e,t)=>{$.once(e,t)},emit:(e,t)=>{$.emit(e,t)}};var F=(e,t)=>{let s=A(e.path.replace(/{(\w+)}/g,(o,r)=>e.params[r].toString()));return t?`${s}/`:s};var _reactquerydevtools = require('@tanstack/react-query-devtools');var _react = require('react'); var _react2 = _interopRequireDefault(_react);var M=class e extends Error{constructor(s,o,r){super(s);this.message=s;this.status=o;this.data=r;Object.setPrototypeOf(this,e.prototype),this.name=this.constructor.name,typeof Error.captureStackTrace=="function"?Error.captureStackTrace(this,this.constructor):this.stack=new Error(s).stack,this.stack=new Error().stack,console.error(this.message,this)}};var X=e=>{if(e!==null&&typeof e=="object"){let t={};return Object.entries(e).forEach(([o,r])=>{(r||typeof r=="boolean"||typeof r=="number")&&(t[o]=r)}),t}return{}};function O(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var w=e=>{let{onSuccess:t,onError:s}=e,o=e.data instanceof FormData,r=(()=>{let a=e.url;if(e.params){let n=X(e.params);if(e.queryParamsSerializer)a+=`?${e.queryParamsSerializer(e.params)}`;else if(Object.keys(n).length>0){let c=[];for(let P in n)n.hasOwnProperty(P)&&(Array.isArray(n[P])?n[P].forEach(C=>{c.push(`${O(P)}${e.queryArrayParamStyle==="indexedArray"?"[]":""}=${O(C)}`)}):c.push(`${O(P)}=${O(n[P])}`));a+=`?${c.join("&")}`}}let[u,y]=a.split("?");return`${u}${y?`?${y}`:""}`})(),m=o?e.data:e.data?JSON.stringify(e.data):"",i={method:e.method,headers:{...!o&&{"Content-Type":"application/json"},...e.authorization&&{Authorization:e.authorization},...e.headers},...m&&{body:m},...e.options};return fetch(r,i).then(async a=>{let u=await(async()=>{try{let n=_optionalChain([a, 'access', _2 => _2.headers, 'access', _3 => _3.get, 'call', _4 => _4("Content-Type"), 'optionalAccess', _5 => _5.toLowerCase, 'call', _6 => _6()])||"";return n.includes("application/json")?await a.json():n.includes("text/plain")||n.includes("text/csv")||n.includes("application/xml")||n.includes("text/xml")||n.includes("application/javascript")||n.includes("text/html")?await a.text():n.includes("multipart/form-data")?await a.formData():await a.blob()}catch(n){throw console.error("Error handling response:",n),n}})(),y={};return a.headers.forEach((n,c)=>{y[c]=n}),{status:a.status,statusText:a.statusText,headers:y,data:u}}).then(a=>{if(a.status<200||a.status>=300){let u=new M(`Request failed with status code: ${a.status}`,a.status,a.data);return s&&s(u,e),Promise.reject(u)}return t&&t(a,e),Promise.resolve(a)}).catch(a=>Promise.reject(new M(a.message)))};var _headless = require('react-hot-toast/headless'); var _headless2 = _interopRequireDefault(_headless);var te=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})();function re({id:e,className:t,style:s,onHeightUpdate:o,children:r}){let m=_react.useCallback.call(void 0, i=>{if(i){let a=()=>{let{height:u}=i.getBoundingClientRect();o(e,u)};a(),new MutationObserver(a).observe(i,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return _react2.default.createElement("div",{ref:m,className:t,style:s},r)}var ae=(e,t)=>{let s=e.includes("top"),o=s?{top:0}:{bottom:0},r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:te()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...o,...r}},q=16;function V({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:o,children:r,containerStyle:m,containerClassName:i}){let{toasts:a,handlers:u}=_headless.useToaster.call(void 0, s);return _react2.default.createElement("div",{style:{position:"fixed",zIndex:9999,top:q,left:q,right:q,bottom:q,pointerEvents:"none",...m},className:i,onMouseEnter:u.startPause,onMouseLeave:u.endPause},a.map(y=>{let n=y.position||t,c={...y,position:n},P=u.calculateOffset(c,{reverseOrder:e,gutter:o,defaultPosition:t}),C=ae(n,P);return _react2.default.createElement(re,{id:c.id,key:c.id,onHeightUpdate:u.updateHeight,style:{...C,pointerEvents:"auto"}},c.type==="custom"?_headless.resolveValue.call(void 0, y.message,c):r?r(c):_react2.default.createElement("div",{style:{display:y.visible?"flex":"none"}},_headless.resolveValue.call(void 0, c.message,c)))}))}var _reacthottoast = require('react-hot-toast');var{remove:Be,...oe}=_headless2.default,B= exports.toast =Object.assign((...e)=>_headless2.default.call(void 0, ...e),oe),we= exports.ToastBar =_reacthottoast.ToastBar,$e= exports.resolveToastValue =_reacthottoast.resolveValue;var z=_react.createContext.call(void 0, {apiUrl:"",apiEnsureTrailingSlash:!1,apiClient:w,toastUndo:()=>{}}),Q= exports.useRQWrapperContext =()=>_react.useContext.call(void 0, z);function Je({children:e,config:t={},apiUrl:s,apiClient:o=w,apiEnsureTrailingSlash:r=!1,apiAuthorization:m,apiHeaders:i,apiOnSuccess:a,apiOnError:u,isDevTools:y,devToolsOptions:n,toast:c}){let P=_react.useMemo.call(void 0, ()=>new (0, _reactquery.QueryClient)({...t,defaultOptions:{..._optionalChain([t, 'optionalAccess', _7 => _7.defaultOptions]),queries:{gcTime:3e5,staleTime:3e5,retry:!1,..._optionalChain([t, 'optionalAccess', _8 => _8.defaultOptions, 'optionalAccess', _9 => _9.queries])}}}),[]),C=_react.useCallback.call(void 0, p=>{let T=m?m():"",d=i?i():{},g=(...D)=>{a&&a(...D),p.onSuccess&&p.onSuccess(...D)},h=(...D)=>{u&&u(...D),p.onError&&p.onError(...D)};return o({...p,headers:p.headers?{...d,...p.headers}:d,authorization:p.authorization||T,onSuccess:g,onError:h})},[]),R=_react.useCallback.call(void 0, p=>{let T=!1;B.dismiss();let d=()=>{T=!0,K.emit("end",!0),B.dismiss()},g=_optionalChain([c, 'optionalAccess', _10 => _10.customUndoContent])?_optionalChain([c, 'optionalAccess', _11 => _11.customUndoContent, 'call', _12 => _12({message:p.message,onUndo:d,type:p.type})]):null;B.success(h=>(!h.visible&&!T&&(T=!0,K.emit("end",!1)),g||_react2.default.createElement(_react2.default.Fragment,null,p.message,_react2.default.createElement("span",{style:{marginLeft:"10px",cursor:"pointer"},onClick:d,role:"button",tabIndex:0,"aria-label":"Undo",title:"Undo"},"UNDO"))),{duration:_optionalChain([c, 'optionalAccess', _13 => _13.globalProps, 'optionalAccess', _14 => _14.toastOptions, 'optionalAccess', _15 => _15.duration])||5e3})},[]),l=_react.useMemo.call(void 0, ()=>({apiUrl:A(s),apiClient:C,apiEnsureTrailingSlash:r,toastUndo:R}),[s,C,R,r]);return _react2.default.createElement(_reactquery.QueryClientProvider,{client:P},_react2.default.createElement(V,{..._optionalChain([c, 'optionalAccess', _16 => _16.globalProps])},_optionalChain([c, 'optionalAccess', _17 => _17.wrapper])),_react2.default.createElement(z.Provider,{value:l},e),y&&_react2.default.createElement(_reactquerydevtools.ReactQueryDevtools,{buttonPosition:"bottom-right",initialIsOpen:!1,...n}))}var tt=({queryOptions:e,resource:t,params:s={},apiClientParams:o})=>{let{apiUrl:r,apiClient:m,apiEnsureTrailingSlash:i}=Q();return _reactquery.useQuery.call(void 0, {...e,queryKey:["get-list",t.path,t.params,s,..._optionalChain([e, 'optionalAccess', _18 => _18.queryKey])?e.queryKey:[]],queryFn:async({queryKey:u})=>{let y={resource:t,params:s,queryKey:u},n=`${r}/${F(y.resource,i)}`;return _optionalChain([e, 'optionalAccess', _19 => _19.queryFn])?await _optionalChain([e, 'optionalAccess', _20 => _20.queryFn, 'call', _21 => _21({apiClient:m,variables:y,url:n})]):await m({url:n,method:"GET",params:s,...o})}})};var it=({queryOptions:e,resource:t,params:s={},apiClientParams:o,pagination:r})=>{let{apiUrl:m,apiClient:i,apiEnsureTrailingSlash:a}=Q();return _reactquery.useInfiniteQuery.call(void 0, {initialPageParam:1,getNextPageParam:(...y)=>{let n=y[0],c=Number(y[2]);if(_optionalChain([n, 'optionalAccess', _22 => _22.data, 'optionalAccess', _23 => _23.length]))return c+1},getPreviousPageParam:(...y)=>{let n=Number(y[2]);if(!(n<=1))return n-1},...e,queryKey:["get-infinite-list",t.path,t.params,r,s,..._optionalChain([e, 'optionalAccess', _24 => _24.queryKey])?e.queryKey:[]],queryFn:async({queryKey:y,pageParam:n})=>{let c={resource:t,params:{...s,[r.page[0]]:n,[r.per_page[0]]:r.per_page[1]},queryKey:y},P=`${m}/${F(c.resource,a)}`;return _optionalChain([e, 'optionalAccess', _25 => _25.queryFn])?await _optionalChain([e, 'optionalAccess', _26 => _26.queryFn, 'call', _27 => _27({apiClient:i,variables:c,url:P})]):await i({url:P,method:"GET",params:c.params,...o})}})};var mt=({resource:e,id:t,queryOptions:s,params:o={},apiClientParams:r})=>{let{apiUrl:m,apiClient:i,apiEnsureTrailingSlash:a}=Q();return _reactquery.useQuery.call(void 0, {...s,queryKey:["get-one",e.path,e.params,String(t),o,..._optionalChain([s, 'optionalAccess', _28 => _28.queryKey])?s.queryKey:[]],queryFn:async({queryKey:y})=>{let n={id:t,resource:e,params:o,queryKey:y},c=`${m}/${F(n.resource,!0)}`;return _optionalChain([s, 'optionalAccess', _29 => _29.queryFn])?await _optionalChain([s, 'optionalAccess', _30 => _30.queryFn, 'call', _31 => _31({apiClient:i,variables:n,url:c})]):await i({url:`${c}${n.id}${a?"/":""}`,method:"GET",params:o,...r})}})};var N=({queryClient:e,ids:t,queryKeysOne:s,queryKeysList:o,queryKeysInfiniteList:r})=>{let m=i=>!i||!(i.data instanceof Array)?i:{...i,data:i.data.filter(a=>!t.some(u=>String(u)===String(a.id)))};s&&s.forEach(i=>{e.removeQueries({queryKey:i})}),o&&o.forEach(i=>{e.setQueriesData({queryKey:i},m)}),r&&r.forEach(i=>{e.setQueriesData({queryKey:i},a=>a&&{...a,pages:a.pages.map(m)})})},G= exports.updateItemsFromQueryCache =({queryClient:e,data:t,ids:s,queryKeysOne:o,queryKeysList:r,queryKeysInfiniteList:m})=>{let i=a=>!a||!(a.data instanceof Array)?a:{...a,data:a.data.map(u=>s.some(y=>String(y)===String(u.id))?L(u,t):u)};o&&o.forEach(a=>{e.setQueriesData({queryKey:a},u=>!u||!(u.data instanceof Object)||!(t instanceof Object)?u:{...u,data:L(u.data,t)})}),r&&r.forEach(a=>{e.setQueriesData({queryKey:a},i)}),m&&m.forEach(a=>{e.setQueriesData({queryKey:a},u=>u&&{...u,pages:u.pages.map(i)})})},f= exports.helpersQueryKeys ={getOne:(e,t)=>["get-one",e.path,e.params,String(t)],getOneArray:(e,t)=>t.map(s=>["get-one",e.path,e.params,String(s)]),getList:e=>["get-list",e.path,e.params],getInfiniteList:e=>["get-infinite-list",e.path,e.params]};var S=({queryClient:e,queryKeys:t})=>{t.forEach(s=>{e.invalidateQueries({queryKey:s})})},H=({queryClient:e,queryKeys:t,data:s})=>{t.forEach(o=>{e.setQueryData(o,s)})};var _=({resourcePath:e,mutationOptions:t,mode:s={optimistic:!0,undoable:!0},extraResources:o=[],type:r="many"})=>{let{apiUrl:m,apiClient:i,apiEnsureTrailingSlash:a,toastUndo:u}=Q(),y=_reactquery.useQueryClient.call(void 0, ),n=_react.useRef.call(void 0, []),c=()=>{n.current.forEach(([l,p])=>{y.setQueryData(l,p)})},{mutate:P,...C}=_reactquery.useMutation.call(void 0, {...t,mutationKey:[r==="many"?"delete-many":"delete-one",e,..._optionalChain([t, 'optionalAccess', _32 => _32.mutationKey])?t.mutationKey:[]],mutationFn:async l=>{let p=`${m}/${F(l.resource,!0)}`;if(_optionalChain([t, 'optionalAccess', _33 => _33.mutationFn]))return await _optionalChain([t, 'optionalAccess', _34 => _34.mutationFn, 'call', _35 => _35({apiClient:i,variables:l,url:p})]);let T=r==="many"?l.ids:[l.id],d=await Promise.allSettled(T.map(h=>i({url:`${p}${h}${a?"/":""}`,method:"DELETE",...l.apiClientParams}))),g=[];return d.forEach(h=>{if(h.status==="fulfilled")g.push(h.value);else throw h.reason}),r==="many"?g:g[0]},onSuccess:(...l)=>{let p=l[1],T=[f.getList(p.resource),f.getInfiniteList(p.resource)];o.forEach(d=>{T.push(f.getList(d)),T.push(f.getInfiniteList(d))}),S({queryClient:y,queryKeys:T}),_optionalChain([t, 'optionalAccess', _36 => _36.onSuccess])&&t.onSuccess(...l)},onError:(...l)=>{_optionalChain([t, 'optionalAccess', _37 => _37.onError])&&t.onError(...l),c()}});return{mutation:C,delete:async({resourceParams:l,undoMessage:p,...T})=>{let d={path:e,params:l},g=r==="many"?T.ids:[T.id];if(s.optimistic){let h=f.getOneArray(d,g),D=[f.getList(d)],b=[f.getInfiniteList(d)];o.forEach(x=>{h.push(...f.getOneArray(x,g)),D.push(f.getList(x)),b.push(f.getInfiniteList(x))}),n.current=await U(y,[...h,...D,...b]),N({queryClient:y,ids:g,queryKeysOne:h,queryKeysList:D,queryKeysInfiniteList:b})}if(s.undoable){let h=g.length>1;K.once("end",D=>{D?c():P({...T,resource:d})}),u({message:p||`Element${h?"s":""} deleted`,type:h?"delete-many":"delete-one"})}else P({...T,resource:d})}}},Rt= exports.useDeleteOne =e=>_({...e,type:"one"}),bt= exports.useDeleteMany =e=>_({...e,type:"many"});var J=({resourcePath:e,mutationOptions:t,mode:s={optimistic:!0,undoable:!0},extraResources:o=[],type:r="many"})=>{let{apiUrl:m,apiClient:i,apiEnsureTrailingSlash:a,toastUndo:u}=Q(),y=_reactquery.useQueryClient.call(void 0, ),n=_react.useRef.call(void 0, []),c=()=>{n.current.forEach(([l,p])=>{y.setQueryData(l,p)})},{mutate:P,...C}=_reactquery.useMutation.call(void 0, {...t,mutationKey:[r==="many"?"update-many":"update-one",e,..._optionalChain([t, 'optionalAccess', _38 => _38.mutationKey])?t.mutationKey:[]],mutationFn:async l=>{let p=`${m}/${F(l.resource,!0)}`;if(_optionalChain([t, 'optionalAccess', _39 => _39.mutationFn]))return await _optionalChain([t, 'optionalAccess', _40 => _40.mutationFn, 'call', _41 => _41({apiClient:i,variables:l,url:p})]);let T=r==="many"?l.ids:[l.id],d=await Promise.allSettled(T.map(h=>i({url:`${p}${h}${a?"/":""}`,method:"PATCH",data:l.data,...l.apiClientParams}))),g=[];return d.forEach(h=>{if(h.status==="fulfilled")g.push(h.value);else throw h.reason}),r==="many"?g:g[0]},onSuccess:(...l)=>{let p=l[1];if(!s.optimistic){let T=r==="many"?p.ids:[p.id],d=[...f.getOneArray(p.resource,T),f.getList(p.resource),f.getInfiniteList(p.resource)];o.forEach(g=>{d.push(...f.getOneArray(g,T)),d.push(f.getList(g)),d.push(f.getInfiniteList(g))}),S({queryClient:y,queryKeys:d})}_optionalChain([t, 'optionalAccess', _42 => _42.onSuccess])&&t.onSuccess(...l)},onError:(...l)=>{_optionalChain([t, 'optionalAccess', _43 => _43.onError])&&t.onError(...l),c()}});return{mutation:C,update:async({resourceParams:l,undoMessage:p,...T})=>{let d={path:e,params:l},g=r==="many"?T.ids:[T.id];if(s.optimistic){let h=f.getOneArray(d,g),D=[f.getList(d)],b=[f.getInfiniteList(d)];o.forEach(x=>{h.push(...f.getOneArray(x,g)),D.push(f.getList(x)),b.push(f.getInfiniteList(x))}),n.current=await U(y,[...h,...D,...b]),G({queryClient:y,data:T.data,ids:g,queryKeysOne:h,queryKeysList:D,queryKeysInfiniteList:b})}if(s.undoable){let h=g.length>1;K.once("end",D=>{D?c():P({...T,resource:d})}),u({message:p||`Element${h?"s":""} updated`,type:h?"update-many":"update-one"})}else P({...T,resource:d})}}},Ot= exports.useUpdateOne =e=>J({...e,type:"one"}),qt= exports.useUpdateMany =e=>J({...e,type:"many"});var jt=({resourcePath:e,mutationOptions:t,extraResources:s=[]})=>{let{apiUrl:o,apiClient:r,apiEnsureTrailingSlash:m}=Q(),i=_reactquery.useQueryClient.call(void 0, ),{mutate:a,...u}=_reactquery.useMutation.call(void 0, {...t,mutationKey:["create",e,..._optionalChain([t, 'optionalAccess', _44 => _44.mutationKey])?t.mutationKey:[]],mutationFn:async n=>{let c=`${o}/${F(n.resource,m)}`;return _optionalChain([t, 'optionalAccess', _45 => _45.mutationFn])?await _optionalChain([t, 'optionalAccess', _46 => _46.mutationFn, 'call', _47 => _47({apiClient:r,variables:n,url:c})]):await r({url:c,method:"POST",data:n.data,...n.apiClientParams})},onSuccess:(...n)=>{let c=n[0],P=n[1],{id:C}=c.data,R=[f.getOne(P.resource,C)],l=[f.getList(P.resource)],p=[f.getInfiniteList(P.resource)];s.forEach(T=>{R.push(f.getOne(T,C)),l.push(f.getList(T)),p.push(f.getInfiniteList(T))}),H({queryClient:i,queryKeys:R.map(T=>[...T,{}]),data:n[0]}),S({queryClient:i,queryKeys:[...l,...p]}),_optionalChain([t, 'optionalAccess', _48 => _48.onSuccess])&&t.onSuccess(...n)}});return{mutation:u,create:({resourceParams:n,...c})=>{a({...c,resource:{path:e,params:n}})}}};exports.CustomError = M; exports.RQWrapper = Je; exports.ToastBar = we; exports.deleteItemsFromQueryCache = N; exports.fetcher = w; exports.getUrlFromResource = F; exports.helpersQueryKeys = f; exports.resolveToastValue = $e; exports.toast = B; exports.updateItemsFromQueryCache = G; exports.useCreate = jt; exports.useDeleteMany = bt; exports.useDeleteOne = Rt; exports.useGetInfiniteList = it; exports.useGetList = tt; exports.useGetOne = mt; exports.useRQWrapperContext = Q; exports.useUpdateMany = qt; exports.useUpdateOne = Ot;
//# sourceMappingURL=index.js.map