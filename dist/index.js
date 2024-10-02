"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _createStarExport(obj) { Object.keys(obj) .filter((key) => key !== "default" && key !== "__esModule") .forEach((key) => { if (exports.hasOwnProperty(key)) { return; } Object.defineProperty(exports, key, {enumerable: true, configurable: true, get: () => obj[key]}); }); } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _reactquery = require('@tanstack/react-query'); _createStarExport(_reactquery);function I(e){return e.replace(/^\/+/,"").replace(/\/+$/,"")}var C=(e,t)=>{let r=I(e.path.replace(/{(\w+)}/g,(a,s)=>e.params[s].toString()));return t?`${r}/`:r};var _reactquerydevtools = require('@tanstack/react-query-devtools');var _react = require('react'); var _react2 = _interopRequireDefault(_react);var O=class e extends Error{constructor(r,a,s){super(r);this.message=r;this.status=a;this.data=s;Object.setPrototypeOf(this,e.prototype),this.name=this.constructor.name,typeof Error.captureStackTrace=="function"?Error.captureStackTrace(this,this.constructor):this.stack=new Error(r).stack,this.stack=new Error().stack,console.error(this.message,this)}};var ne=e=>{if(e!==null&&typeof e=="object"){let t={};return Object.entries(e).forEach(([a,s])=>{(s||typeof s=="boolean"||typeof s=="number")&&(t[a]=s)}),t}return{}};function v(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var k=({onSuccess:e,onError:t,context:r,...a})=>{let s=a.data instanceof FormData,i=(()=>{let o=a.url;if(a.params){let u=ne(a.params);if(a.queryParamsSerializer)o+=`?${a.queryParamsSerializer(a.params)}`;else if(Object.keys(u).length>0){let f=[];for(let Q in u)u.hasOwnProperty(Q)&&(Array.isArray(u[Q])?u[Q].forEach(x=>{f.push(`${v(Q)}${a.queryArrayParamStyle==="indexedArray"?"[]":""}=${v(x)}`)}):f.push(`${v(Q)}=${v(u[Q])}`));o+=`?${f.join("&")}`}}let[p,l]=o.split("?");return`${p}${l?`?${l}`:""}`})(),n=s?a.data:a.data?JSON.stringify(a.data):"",y={method:a.method,headers:{...!s&&{"Content-Type":"application/json"},...a.authorization&&{Authorization:a.authorization},...a.headers},...n&&{body:n},...a.options};return fetch(i,y).then(async o=>{let p=await(async()=>{try{let u=_optionalChain([o, 'access', _2 => _2.headers, 'access', _3 => _3.get, 'call', _4 => _4("Content-Type"), 'optionalAccess', _5 => _5.toLowerCase, 'call', _6 => _6()])||"";return u.includes("application/json")?await o.json():u.includes("text/plain")||u.includes("text/csv")||u.includes("application/xml")||u.includes("text/xml")||u.includes("application/javascript")||u.includes("text/html")?await o.text():u.includes("multipart/form-data")?await o.formData():await o.blob()}catch(u){throw console.error("Error handling response:",u),u}})(),l={};return o.headers.forEach((u,f)=>{l[f]=u}),{status:o.status,statusText:o.statusText,headers:l,data:p}}).then(o=>{if(o.status<200||o.status>=300){let p=new O(`Request failed with status code: ${o.status}`,o.status,o.data);return t&&t(p,a,r),Promise.reject(p)}return e&&e(o,a,r),Promise.resolve(o)}).catch(o=>Promise.reject(new O(o.message)))};var _headless = require('react-hot-toast/headless'); var _headless2 = _interopRequireDefault(_headless);var ye=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"&&window.matchMedia){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})();function pe({id:e,className:t,style:r,onHeightUpdate:a,children:s}){let i=_react.useCallback.call(void 0, n=>{if(n){let y=()=>{let{height:o}=n.getBoundingClientRect();a(e,o)};y(),new MutationObserver(y).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return _react2.default.createElement("div",{"data-toast-id":e,ref:i,className:t,style:r},s)}var ce=(e,t)=>{let r=e.includes("top"),a=r?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:ye()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...a,...s}},j=16;function _({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:s,containerStyle:i,containerClassName:n}){let{toasts:y,handlers:o}=_headless.useToaster.call(void 0, r);return _react2.default.createElement("div",{style:{position:"fixed",zIndex:9999,top:j,left:j,right:j,bottom:j,pointerEvents:"none",...i},className:n,onMouseEnter:o.startPause,onMouseLeave:o.endPause},y.map(p=>{let l=p.position||t,u={...p,position:l},f=o.calculateOffset(u,{reverseOrder:e,gutter:a,defaultPosition:t}),Q=ce(l,f),x=s;return _react2.default.createElement(pe,{id:u.id,key:u.id,onHeightUpdate:o.updateHeight,style:{...Q,pointerEvents:"auto"}},u.type==="custom"?_headless.resolveValue.call(void 0, p.message,u):x?_react2.default.createElement(x,{...u}):_react2.default.createElement("div",{style:{display:p.visible?"flex":"none"}},_headless.resolveValue.call(void 0, u.message,u)))}))}var _reacthottoast = require('react-hot-toast');var{remove:ze,...Te}=_headless2.default,w= exports.toast =Object.assign((...e)=>_headless2.default.call(void 0, ...e),Te),Ge= exports.ToastBar =_reacthottoast.ToastBar,He= exports.resolveToastValue =_reacthottoast.resolveValue;var _eventemitter3 = require('eventemitter3'); var _eventemitter32 = _interopRequireDefault(_eventemitter3);var G=new _eventemitter32.default,S={once:(e,t)=>{G.once(e,t)},emit:(e,t)=>{G.emit(e,t)}};var L=process.env.NODE_ENV==="test";var N={queryClient:{}},g=()=>N.queryClient;var Y=_react.createContext.call(void 0, {apiUrl:"",apiEnsureTrailingSlash:!1,apiClient:k,toastUndo:()=>{}}),b= exports.useRQWrapperContext =()=>_react.useContext.call(void 0, Y);function lt({children:e,config:t={},apiUrl:r,apiClient:a=k,apiEnsureTrailingSlash:s=!1,apiAuthorization:i,apiHeaders:n,apiOnSuccess:y,apiOnError:o,isDevTools:p,devToolsOptions:l,toast:u}){let f=_react.useMemo.call(void 0, ()=>{let c=new (0, _reactquery.QueryClient)({...t});return N.queryClient=c,c},[]),Q=_react.useCallback.call(void 0, c=>{let m=i?i():"",T=n?n():{},h=(...d)=>{y&&y(...d),c.onSuccess&&c.onSuccess(...d)},P=(...d)=>{o&&o(...d),c.onError&&c.onError(...d)};return a({...c,headers:c.headers?{...T,...c.headers}:T,authorization:c.authorization||m,onSuccess:h,onError:P})},[]),x=_react.useCallback.call(void 0, c=>{let m=!1;w.dismiss();let T=()=>{m=!0,S.emit("end",!0),w.dismiss()};L||w.success(h=>{let P=_optionalChain([u, 'optionalAccess', _7 => _7.CustomUndoContent]);return!h.visible&&!m&&(m=!0,S.emit("end",!1)),P?_react2.default.createElement(P,{message:c.message,onUndo:T,type:c.type,toast:h}):_react2.default.createElement(_react2.default.Fragment,null,c.message,_react2.default.createElement("span",{style:{marginLeft:"10px",cursor:"pointer"},onClick:T,role:"button",tabIndex:0,"aria-label":"Undo",title:"Undo"},"UNDO"))},{duration:_optionalChain([u, 'optionalAccess', _8 => _8.globalProps, 'optionalAccess', _9 => _9.toastOptions, 'optionalAccess', _10 => _10.duration])||5e3})},[]),R=_react.useMemo.call(void 0, ()=>({apiUrl:I(r),apiClient:Q,apiEnsureTrailingSlash:s,toastUndo:x}),[r,Q,x,s]);return _react2.default.createElement(_reactquery.QueryClientProvider,{client:f},!L&&_react2.default.createElement(_,{..._optionalChain([u, 'optionalAccess', _11 => _11.globalProps])},_optionalChain([u, 'optionalAccess', _12 => _12.CustomContent])),_react2.default.createElement(Y.Provider,{value:R},e),p&&_react2.default.createElement(_reactquerydevtools.ReactQueryDevtools,{buttonPosition:"bottom-right",initialIsOpen:!1,...l}))}var Pt=({queryOptions:e,resource:t,params:r={},apiClientParams:a})=>{let{apiUrl:s,apiClient:i,apiEnsureTrailingSlash:n}=b();return _reactquery.useQuery.call(void 0, {...e,queryKey:["get-list",t.path,t.params,r,..._optionalChain([e, 'optionalAccess', _13 => _13.queryKey])?e.queryKey:[]],queryFn:async({queryKey:o})=>{let p={resource:t,params:r,queryKey:o},l=`${s}/${C(p.resource,n)}`;return _optionalChain([e, 'optionalAccess', _14 => _14.queryFn])?await _optionalChain([e, 'optionalAccess', _15 => _15.queryFn, 'call', _16 => _16({apiClient:i,apiUrl:s,variables:p,url:l})]):await i({url:l,method:"GET",params:r,...a})}})};var Ct=({queryOptions:e,resource:t,params:r={},apiClientParams:a,pagination:s})=>{let{apiUrl:i,apiClient:n,apiEnsureTrailingSlash:y}=b();return _reactquery.useInfiniteQuery.call(void 0, {initialPageParam:1,getNextPageParam:(...p)=>{let l=p[0],u=Number(p[2]);if(_optionalChain([l, 'optionalAccess', _17 => _17.data, 'optionalAccess', _18 => _18.length]))return u+1},getPreviousPageParam:(...p)=>{let l=Number(p[2]);if(!(l<=1))return l-1},...e,queryKey:["get-infinite-list",t.path,t.params,s,r,..._optionalChain([e, 'optionalAccess', _19 => _19.queryKey])?e.queryKey:[]],queryFn:async({queryKey:p,pageParam:l})=>{let u={resource:t,params:{...r,[s.page[0]]:l,[s.per_page[0]]:s.per_page[1]},queryKey:p},f=`${i}/${C(u.resource,y)}`;return _optionalChain([e, 'optionalAccess', _20 => _20.queryFn])?await _optionalChain([e, 'optionalAccess', _21 => _21.queryFn, 'call', _22 => _22({apiClient:n,apiUrl:i,variables:u,url:f})]):await n({url:f,method:"GET",params:u.params,...a})}})};var Mt=({resource:e,id:t,queryOptions:r,params:a={},apiClientParams:s})=>{let{apiUrl:i,apiClient:n,apiEnsureTrailingSlash:y}=b();return _reactquery.useQuery.call(void 0, {...r,queryKey:["get-one",e.path,e.params,String(t),a,..._optionalChain([r, 'optionalAccess', _23 => _23.queryKey])?r.queryKey:[]],queryFn:async({queryKey:p})=>{let l={id:t,resource:e,params:a,queryKey:p},u=`${i}/${C(l.resource,!0)}`;return _optionalChain([r, 'optionalAccess', _24 => _24.queryFn])?await _optionalChain([r, 'optionalAccess', _25 => _25.queryFn, 'call', _26 => _26({apiClient:n,apiUrl:i,variables:l,url:u})]):await n({url:`${u}${l.id}${y?"/":""}`,method:"GET",params:a,...s})}})};var X=({data:e,queryKeysOne:t})=>{let r=g();t&&t.forEach(a=>{r.setQueryData(a,e)})};var Z=({data:e,queryKeysList:t,queryKeysInfiniteList:r,cacheAddItemTo:a="start"})=>{let s=g(),i=n=>!n||!(n.data instanceof Array)?n:{...n,data:a==="start"?[...e,...n.data]:[...n.data,...e]};t&&t.forEach(n=>{s.setQueriesData({queryKey:n},i)}),r&&r.forEach(n=>{s.setQueriesData({queryKey:n},y=>y&&{...y,pages:y.pages.map(i)})})};var ee=({queryKeys:e})=>{let t=g();e.forEach(r=>{t.removeQueries({queryKey:r})})};var te=({ids:e,queryKeysOne:t,queryKeysList:r,queryKeysInfiniteList:a})=>{let s=g(),i=n=>!n||!(n.data instanceof Array)?n:{...n,data:n.data.filter(y=>!e.some(o=>String(o)===String(y.id)))};t&&ee({queryKeys:t}),r&&r.forEach(n=>{s.setQueriesData({queryKey:n},i)}),a&&a.forEach(n=>{s.setQueriesData({queryKey:n},y=>y&&{...y,pages:y.pages.map(i)})})};var D={getOne:(e,t)=>["get-one",e.path,e.params,String(t)],getOneArray:(e,t)=>t.map(r=>["get-one",e.path,e.params,String(r)]),getList:e=>["get-list",e.path,e.params],getInfiniteList:e=>["get-infinite-list",e.path,e.params],getDataQuery:e=>["query-data",e.path,e.params]};function q(e,t){if(typeof e!=typeof t)return!1;if(e instanceof Object&&t instanceof Object){let r=Object.keys(e),a=Object.keys(t);if(r.length!==a.length)return!1;for(let s of r){let i=e[s],n=t[s];if(i!==n&&!q(i,n))return!1}return!0}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r]&&!q(e[r],t[r]))return!1;return!0}return e===t}var Nt=({queryKeys:e})=>{g().invalidateQueries({predicate:r=>{let a=r.queryKey;return e.some(s=>s.every(i=>a.some(n=>q(n,i))))}})};var Gt=({queryKeys:e})=>{g().removeQueries({predicate:r=>{let a=r.queryKey;return e.some(s=>s.every(i=>a.some(n=>q(n,i))))}})};var A=({queryKeys:e})=>{let t=g();e.forEach(r=>{t.invalidateQueries({queryKey:r})})};function re(e){return!Number.isNaN(Number(e))}function Ce(e,t){return re(e)&&re(t)}function V(e,t){let r={...e};if(e instanceof Object&&t instanceof Object){for(let a in t)if(a in e){let s=e[a],i=t[a],n=typeof s==typeof i&&(Array.isArray(s)&&Array.isArray(i)||s!==null&&!Array.isArray(s)&&typeof s=="object"&&!Array.isArray(i)&&typeof i=="object"||typeof s!="object"&&typeof i!="object"),y=Ce(s,i);(n||y)&&(typeof s=="object"&&s!==null&&!Array.isArray(s)?r[a]=V(s,i):r[a]=i)}}return r}var ae=({data:e,ids:t,queryKeysOne:r,queryKeysList:a,queryKeysInfiniteList:s})=>{let i=g(),n=y=>!y||!(y.data instanceof Array)?y:{...y,data:y.data.map(o=>t.some(p=>String(p)===String(o.id))?V(o,e):o)};r&&r.forEach(y=>{i.setQueriesData({queryKey:y},o=>!o||!(o.data instanceof Object)||!(e instanceof Object)?o:{...o,data:V(o.data,e)})}),a&&a.forEach(y=>{i.setQueriesData({queryKey:y},n)}),s&&s.forEach(y=>{i.setQueriesData({queryKey:y},o=>o&&{...o,pages:o.pages.map(n)})})};var $=async e=>{let t=g(),r=e.reduce((a,s)=>a.concat(t.getQueriesData({queryKey:s})),[]);return await Promise.all(r.map(([a])=>t.cancelQueries({queryKey:a}))),r};var se=({resourcePath:e,mutationOptions:t,mode:r={optimistic:!0,undoable:!0},extraResources:a=[],shouldUpdateCurrentResource:s=!0,isInvalidateCache:i=!0,type:n="many"})=>{let{apiUrl:y,apiClient:o,apiEnsureTrailingSlash:p,toastUndo:l}=b(),u=_reactquery.useQueryClient.call(void 0, ),f=_react.useRef.call(void 0, []),Q=()=>{f.current.forEach(([m,T])=>{u.setQueryData(m,T)})},{mutate:x,...R}=_reactquery.useMutation.call(void 0, {...t,mutationKey:[n==="many"?"delete-many":"delete-one",e,..._optionalChain([t, 'optionalAccess', _27 => _27.mutationKey])?t.mutationKey:[]],mutationFn:async m=>{let T=`${y}/${C(m.resource,!0)}`;if(_optionalChain([t, 'optionalAccess', _28 => _28.mutationFn]))return await _optionalChain([t, 'optionalAccess', _29 => _29.mutationFn, 'call', _30 => _30({apiClient:o,apiUrl:y,variables:m,url:T})]);let h=n==="many"?m.ids:[m.id],P=await Promise.allSettled(h.map(E=>o({url:`${T}${E}${p?"/":""}`,method:"DELETE",...m.apiClientParams}))),d=[];return P.forEach(E=>{if(E.status==="fulfilled")d.push(E.value);else throw E.reason}),n==="many"?d:d[0]},onSuccess:(...m)=>{let T=m[1],h=[D.getList(T.resource),D.getInfiniteList(T.resource)];a.forEach(P=>{h.push(D.getList(P)),h.push(D.getInfiniteList(P))}),i&&A({queryKeys:h}),_optionalChain([t, 'optionalAccess', _31 => _31.onSuccess])&&t.onSuccess(...m)},onError:(...m)=>{_optionalChain([t, 'optionalAccess', _32 => _32.onError])&&t.onError(...m),Q()}});return{mutation:R,delete:async({resourceParams:m,undoMessage:T,...h})=>{let P={path:e,params:m},d=n==="many"?h.ids:[h.id];if(r.optimistic){let E=s?D.getOneArray(P,d):[],K=s?[D.getList(P)]:[],M=s?[D.getInfiniteList(P)]:[];a.forEach(B=>{E.push(...D.getOneArray(B,d)),K.push(D.getList(B)),M.push(D.getInfiniteList(B))}),f.current=await $([...E,...K,...M]),te({ids:d,queryKeysOne:E,queryKeysList:K,queryKeysInfiniteList:M})}if(r.undoable&&!L){let E=d.length>1;S.once("end",K=>{K?Q():x({...h,resource:P})}),l({message:T||`Element${E?"s":""} deleted`,type:E?"delete-many":"delete-one"})}else x({...h,resource:P})}}},Er= exports.useDeleteOne =e=>se({...e,type:"one"}),gr= exports.useDeleteMany =e=>se({...e,type:"many"});var oe=({resourcePath:e,mutationOptions:t,mode:r={optimistic:!0,undoable:!0},extraResources:a=[],shouldUpdateCurrentResource:s=!0,type:i="many"})=>{let{apiUrl:n,apiClient:y,apiEnsureTrailingSlash:o,toastUndo:p}=b(),l=_reactquery.useQueryClient.call(void 0, ),u=_react.useRef.call(void 0, []),f=()=>{u.current.forEach(([c,m])=>{l.setQueryData(c,m)})},{mutate:Q,...x}=_reactquery.useMutation.call(void 0, {...t,mutationKey:[i==="many"?"update-many":"update-one",e,..._optionalChain([t, 'optionalAccess', _33 => _33.mutationKey])?t.mutationKey:[]],mutationFn:async c=>{let m=`${n}/${C(c.resource,!0)}`;if(_optionalChain([t, 'optionalAccess', _34 => _34.mutationFn]))return await _optionalChain([t, 'optionalAccess', _35 => _35.mutationFn, 'call', _36 => _36({apiClient:y,apiUrl:n,variables:c,url:m})]);let T=i==="many"?c.ids:[c.id],h=await Promise.allSettled(T.map(d=>y({url:`${m}${d}${o?"/":""}`,method:"PATCH",data:c.data,...c.apiClientParams}))),P=[];return h.forEach(d=>{if(d.status==="fulfilled")P.push(d.value);else throw d.reason}),i==="many"?P:P[0]},onSuccess:(...c)=>{let m=c[1];if(!r.optimistic){let T=i==="many"?m.ids:[m.id],h=[...D.getOneArray(m.resource,T),D.getList(m.resource),D.getInfiniteList(m.resource)];a.forEach(P=>{h.push(...D.getOneArray(P,T)),h.push(D.getList(P)),h.push(D.getInfiniteList(P))}),A({queryKeys:h})}_optionalChain([t, 'optionalAccess', _37 => _37.onSuccess])&&t.onSuccess(...c)},onError:(...c)=>{_optionalChain([t, 'optionalAccess', _38 => _38.onError])&&t.onError(...c),f()}});return{mutation:x,update:async({resourceParams:c,undoMessage:m,...T})=>{let h={path:e,params:c},P=i==="many"?T.ids:[T.id];if(r.optimistic){let d=s?D.getOneArray(h,P):[],E=s?[D.getList(h)]:[],K=s?[D.getInfiniteList(h)]:[];a.forEach(M=>{d.push(...D.getOneArray(M,P)),E.push(D.getList(M)),K.push(D.getInfiniteList(M))}),u.current=await $([...d,...E,...K]),ae({data:T.data,ids:P,queryKeysOne:d,queryKeysList:E,queryKeysInfiniteList:K})}if(r.undoable&&!L){let d=P.length>1;S.once("end",E=>{E?f():Q({...T,resource:h})}),p({message:m||`Element${d?"s":""} updated`,type:d?"update-many":"update-one"})}else Q({...T,resource:h})}}},Ar= exports.useUpdateOne =e=>oe({...e,type:"one"}),Or= exports.useUpdateMany =e=>oe({...e,type:"many"});var Vr=({resourcePath:e,mutationOptions:t,extraResources:r=[],shouldUpdateCurrentResource:a=!0,cacheAddItemTo:s="start",isInvalidateCache:i=!0})=>{let{apiUrl:n,apiClient:y,apiEnsureTrailingSlash:o}=b(),{mutate:p,...l}=_reactquery.useMutation.call(void 0, {...t,mutationKey:["create",e,..._optionalChain([t, 'optionalAccess', _39 => _39.mutationKey])?t.mutationKey:[]],mutationFn:async f=>{let Q=`${n}/${C(f.resource,o)}`;return _optionalChain([t, 'optionalAccess', _40 => _40.mutationFn])?await _optionalChain([t, 'optionalAccess', _41 => _41.mutationFn, 'call', _42 => _42({apiClient:y,apiUrl:n,variables:f,url:Q})]):await y({url:Q,method:"POST",data:f.data,...f.apiClientParams})},onSuccess:(...f)=>{let Q=f[0];if(Q){let x=f[1],R=a?[D.getList(x.resource)]:[],c=a?[D.getInfiniteList(x.resource)]:[];r.forEach(T=>{R.push(D.getList(T)),c.push(D.getInfiniteList(T))});let m=Array.isArray(Q)?Q:[Q];m.forEach(T=>{let{id:h}=T.data,P=a?[D.getOne(x.resource,h)]:[];r.forEach(d=>{P.push(D.getOne(d,h))}),X({data:T.data||{},queryKeysOne:P.map(d=>[...d,{}])})}),Z({data:m.map(T=>_optionalChain([T, 'optionalAccess', _43 => _43.data])||{}),cacheAddItemTo:s,queryKeysInfiniteList:c,queryKeysList:R}),i&&A({queryKeys:[...R,...c]})}_optionalChain([t, 'optionalAccess', _44 => _44.onSuccess])&&t.onSuccess(...f)}});return{mutation:l,create:({resourceParams:f,...Q})=>{p({...Q,resource:{path:e,params:f}})}}};var Wr=({queryOptions:e,resource:t,params:r={},apiClientParams:a})=>{let{apiUrl:s,apiClient:i,apiEnsureTrailingSlash:n}=b();return _reactquery.useQuery.call(void 0, {...e,queryKey:["query-data",t.path,t.params,r,..._optionalChain([e, 'optionalAccess', _45 => _45.queryKey])?e.queryKey:[]],queryFn:async({queryKey:o})=>{let p={resource:t,params:r,queryKey:o},l=`${s}/${C(p.resource,n)}`;return _optionalChain([e, 'optionalAccess', _46 => _46.queryFn])?await _optionalChain([e, 'optionalAccess', _47 => _47.queryFn, 'call', _48 => _48({apiClient:i,apiUrl:s,variables:p,url:l})]):await i({url:l,method:"GET",params:r,...a})}})};var Jr=({resourcePath:e,mutationOptions:t})=>{let{apiUrl:r,apiClient:a,apiEnsureTrailingSlash:s}=b(),{mutate:i,...n}=_reactquery.useMutation.call(void 0, {...t,mutationKey:["mutate-data",e,..._optionalChain([t, 'optionalAccess', _49 => _49.mutationKey])?t.mutationKey:[]],mutationFn:async o=>{let p=`${r}/${C(o.resource,s)}`;return _optionalChain([t, 'optionalAccess', _50 => _50.mutationFn])?await _optionalChain([t, 'optionalAccess', _51 => _51.mutationFn, 'call', _52 => _52({apiClient:a,apiUrl:r,variables:o,url:p})]):await a({url:p,data:o.data,...o.apiClientParams})}});return{mutation:n,mutate:async({resourceParams:o,...p})=>{i({...p,resource:{path:e,params:o}})}}};exports.CustomError = O; exports.RQWrapper = lt; exports.ToastBar = Ge; exports.addItemToQueryCache = X; exports.addItemsToListQueryCache = Z; exports.deleteItemsFromQueryCache = te; exports.fetcher = k; exports.getUrlFromResource = C; exports.helpersQueryKeys = D; exports.invalidateMatchingQueries = Nt; exports.invalidateQueries = A; exports.removeMatchingQueries = Gt; exports.removeQueries = ee; exports.resolveToastValue = He; exports.toast = w; exports.updateItemsFromQueryCache = ae; exports.useCreate = Vr; exports.useDataMutate = Jr; exports.useDataQuery = Wr; exports.useDeleteMany = gr; exports.useDeleteOne = Er; exports.useGetInfiniteList = Ct; exports.useGetList = Pt; exports.useGetOne = Mt; exports.useRQWrapperContext = b; exports.useUpdateMany = Or; exports.useUpdateOne = Ar;
//# sourceMappingURL=index.js.map