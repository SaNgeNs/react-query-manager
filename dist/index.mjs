export*from"@tanstack/react-query";import{useQuery as me}from"@tanstack/react-query";import Y from"eventemitter3";function L(e,t){let s={...e};if(e instanceof Object&&t instanceof Object){for(let o in t)if(o in e){let r=e[o],m=t[o];typeof r==typeof m&&(Array.isArray(r)&&Array.isArray(m)||r!==null&&!Array.isArray(r)&&typeof r=="object"&&!Array.isArray(m)&&typeof m=="object"||typeof r!="object"&&typeof m!="object")&&(typeof r=="object"&&r!==null&&!Array.isArray(r)?s[o]=L(r,m):s[o]=m)}}return s}var U=async(e,t)=>{let s=t.reduce((o,r)=>o.concat(e.getQueriesData({queryKey:r})),[]);return await Promise.all(s.map(([o])=>e.cancelQueries({queryKey:o}))),s};function A(e){return e.replace(/^\/+/,"").replace(/\/+$/,"")}var $=new Y,K={once:(e,t)=>{$.once(e,t)},emit:(e,t)=>{$.emit(e,t)}};var F=(e,t)=>{let s=A(e.path.replace(/{(\w+)}/g,(o,r)=>e.params[r].toString()));return t?`${s}/`:s};import{QueryClient as ie,QueryClientProvider as ue}from"@tanstack/react-query";import{ReactQueryDevtools as ce}from"@tanstack/react-query-devtools";import E,{createContext as pe,useCallback as k,useContext as ye,useMemo as W}from"react";var M=class e extends Error{constructor(s,o,r){super(s);this.message=s;this.status=o;this.data=r;Object.setPrototypeOf(this,e.prototype),this.name=this.constructor.name,typeof Error.captureStackTrace=="function"?Error.captureStackTrace(this,this.constructor):this.stack=new Error(s).stack,this.stack=new Error().stack,console.error(this.message,this)}};var X=e=>{if(e!==null&&typeof e=="object"){let t={};return Object.entries(e).forEach(([o,r])=>{(r||typeof r=="boolean"||typeof r=="number")&&(t[o]=r)}),t}return{}};function O(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var w=e=>{let{onSuccess:t,onError:s}=e,o=e.data instanceof FormData,r=(()=>{let a=e.url;if(e.params){let n=X(e.params);if(e.queryParamsSerializer)a+=`?${e.queryParamsSerializer(e.params)}`;else if(Object.keys(n).length>0){let c=[];for(let P in n)n.hasOwnProperty(P)&&(Array.isArray(n[P])?n[P].forEach(C=>{c.push(`${O(P)}${e.queryArrayParamStyle==="indexedArray"?"[]":""}=${O(C)}`)}):c.push(`${O(P)}=${O(n[P])}`));a+=`?${c.join("&")}`}}let[u,y]=a.split("?");return`${u}${y?`?${y}`:""}`})(),m=o?e.data:e.data?JSON.stringify(e.data):"",i={method:e.method,headers:{...!o&&{"Content-Type":"application/json"},...e.authorization&&{Authorization:e.authorization},...e.headers},...m&&{body:m},...e.options};return fetch(r,i).then(async a=>{let u=await(async()=>{try{let n=a.headers.get("Content-Type")?.toLowerCase()||"";return n.includes("application/json")?await a.json():n.includes("text/plain")||n.includes("text/csv")||n.includes("application/xml")||n.includes("text/xml")||n.includes("application/javascript")||n.includes("text/html")?await a.text():n.includes("multipart/form-data")?await a.formData():await a.blob()}catch(n){throw console.error("Error handling response:",n),n}})(),y={};return a.headers.forEach((n,c)=>{y[c]=n}),{status:a.status,statusText:a.statusText,headers:y,data:u}}).then(a=>{if(a.status<200||a.status>=300){let u=new M(`Request failed with status code: ${a.status}`,a.status,a.data);return s&&s(u,e),Promise.reject(u)}return t&&t(a,e),Promise.resolve(a)}).catch(a=>Promise.reject(new M(a.message)))};import I,{useCallback as Z}from"react";import{resolveValue as v,useToaster as ee}from"react-hot-toast/headless";var te=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})();function re({id:e,className:t,style:s,onHeightUpdate:o,children:r}){let m=Z(i=>{if(i){let a=()=>{let{height:u}=i.getBoundingClientRect();o(e,u)};a(),new MutationObserver(a).observe(i,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return I.createElement("div",{ref:m,className:t,style:s},r)}var ae=(e,t)=>{let s=e.includes("top"),o=s?{top:0}:{bottom:0},r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:te()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...o,...r}},q=16;function V({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:o,children:r,containerStyle:m,containerClassName:i}){let{toasts:a,handlers:u}=ee(s);return I.createElement("div",{style:{position:"fixed",zIndex:9999,top:q,left:q,right:q,bottom:q,pointerEvents:"none",...m},className:i,onMouseEnter:u.startPause,onMouseLeave:u.endPause},a.map(y=>{let n=y.position||t,c={...y,position:n},P=u.calculateOffset(c,{reverseOrder:e,gutter:o,defaultPosition:t}),C=ae(n,P);return I.createElement(re,{id:c.id,key:c.id,onHeightUpdate:u.updateHeight,style:{...C,pointerEvents:"auto"}},c.type==="custom"?v(y.message,c):r?r(c):I.createElement("div",{style:{display:y.visible?"flex":"none"}},v(c.message,c)))}))}import j from"react-hot-toast/headless";import{ToastBar as se,resolveValue as ne}from"react-hot-toast";var{remove:Be,...oe}=j,B=Object.assign((...e)=>j(...e),oe),we=se,$e=ne;var z=pe({apiUrl:"",apiEnsureTrailingSlash:!1,apiClient:w,toastUndo:()=>{}}),Q=()=>ye(z);function Je({children:e,config:t={},apiUrl:s,apiClient:o=w,apiEnsureTrailingSlash:r=!1,apiAuthorization:m,apiHeaders:i,apiOnSuccess:a,apiOnError:u,isDevTools:y,devToolsOptions:n,toast:c}){let P=W(()=>new ie({...t,defaultOptions:{...t?.defaultOptions,queries:{gcTime:3e5,staleTime:3e5,retry:!1,...t?.defaultOptions?.queries}}}),[]),C=k(p=>{let T=m?m():"",d=i?i():{},g=(...D)=>{a&&a(...D),p.onSuccess&&p.onSuccess(...D)},h=(...D)=>{u&&u(...D),p.onError&&p.onError(...D)};return o({...p,headers:p.headers?{...d,...p.headers}:d,authorization:p.authorization||T,onSuccess:g,onError:h})},[]),R=k(p=>{let T=!1;B.dismiss();let d=()=>{T=!0,K.emit("end",!0),B.dismiss()},g=c?.customUndoContent?c?.customUndoContent({message:p.message,onUndo:d,type:p.type}):null;B.success(h=>(!h.visible&&!T&&(T=!0,K.emit("end",!1)),g||E.createElement(E.Fragment,null,p.message,E.createElement("span",{style:{marginLeft:"10px",cursor:"pointer"},onClick:d,role:"button",tabIndex:0,"aria-label":"Undo",title:"Undo"},"UNDO"))),{duration:c?.globalProps?.toastOptions?.duration||5e3})},[]),l=W(()=>({apiUrl:A(s),apiClient:C,apiEnsureTrailingSlash:r,toastUndo:R}),[s,C,R,r]);return E.createElement(ue,{client:P},E.createElement(V,{...c?.globalProps},c?.wrapper),E.createElement(z.Provider,{value:l},e),y&&E.createElement(ce,{buttonPosition:"bottom-right",initialIsOpen:!1,...n}))}var tt=({queryOptions:e,resource:t,params:s={},apiClientParams:o})=>{let{apiUrl:r,apiClient:m,apiEnsureTrailingSlash:i}=Q();return me({...e,queryKey:["get-list",t.path,t.params,s,...e?.queryKey?e.queryKey:[]],queryFn:async({queryKey:u})=>{let y={resource:t,params:s,queryKey:u},n=`${r}/${F(y.resource,i)}`;return e?.queryFn?await e?.queryFn({apiClient:m,variables:y,url:n}):await m({url:n,method:"GET",params:s,...o})}})};import{useInfiniteQuery as le}from"@tanstack/react-query";var it=({queryOptions:e,resource:t,params:s={},apiClientParams:o,pagination:r})=>{let{apiUrl:m,apiClient:i,apiEnsureTrailingSlash:a}=Q();return le({initialPageParam:1,getNextPageParam:(...y)=>{let n=y[0],c=Number(y[2]);if(n?.data?.length)return c+1},getPreviousPageParam:(...y)=>{let n=Number(y[2]);if(!(n<=1))return n-1},...e,queryKey:["get-infinite-list",t.path,t.params,r,s,...e?.queryKey?e.queryKey:[]],queryFn:async({queryKey:y,pageParam:n})=>{let c={resource:t,params:{...s,[r.page[0]]:n,[r.per_page[0]]:r.per_page[1]},queryKey:y},P=`${m}/${F(c.resource,a)}`;return e?.queryFn?await e?.queryFn({apiClient:i,variables:c,url:P}):await i({url:P,method:"GET",params:c.params,...o})}})};import{useQuery as Te}from"@tanstack/react-query";var mt=({resource:e,id:t,queryOptions:s,params:o={},apiClientParams:r})=>{let{apiUrl:m,apiClient:i,apiEnsureTrailingSlash:a}=Q();return Te({...s,queryKey:["get-one",e.path,e.params,String(t),o,...s?.queryKey?s.queryKey:[]],queryFn:async({queryKey:y})=>{let n={id:t,resource:e,params:o,queryKey:y},c=`${m}/${F(n.resource,!0)}`;return s?.queryFn?await s?.queryFn({apiClient:i,variables:n,url:c}):await i({url:`${c}${n.id}${a?"/":""}`,method:"GET",params:o,...r})}})};import{useMutation as he,useQueryClient as fe}from"@tanstack/react-query";import{useRef as de}from"react";var N=({queryClient:e,ids:t,queryKeysOne:s,queryKeysList:o,queryKeysInfiniteList:r})=>{let m=i=>!i||!(i.data instanceof Array)?i:{...i,data:i.data.filter(a=>!t.some(u=>String(u)===String(a.id)))};s&&s.forEach(i=>{e.removeQueries({queryKey:i})}),o&&o.forEach(i=>{e.setQueriesData({queryKey:i},m)}),r&&r.forEach(i=>{e.setQueriesData({queryKey:i},a=>a&&{...a,pages:a.pages.map(m)})})},G=({queryClient:e,data:t,ids:s,queryKeysOne:o,queryKeysList:r,queryKeysInfiniteList:m})=>{let i=a=>!a||!(a.data instanceof Array)?a:{...a,data:a.data.map(u=>s.some(y=>String(y)===String(u.id))?L(u,t):u)};o&&o.forEach(a=>{e.setQueriesData({queryKey:a},u=>!u||!(u.data instanceof Object)||!(t instanceof Object)?u:{...u,data:L(u.data,t)})}),r&&r.forEach(a=>{e.setQueriesData({queryKey:a},i)}),m&&m.forEach(a=>{e.setQueriesData({queryKey:a},u=>u&&{...u,pages:u.pages.map(i)})})},f={getOne:(e,t)=>["get-one",e.path,e.params,String(t)],getOneArray:(e,t)=>t.map(s=>["get-one",e.path,e.params,String(s)]),getList:e=>["get-list",e.path,e.params],getInfiniteList:e=>["get-infinite-list",e.path,e.params]};var S=({queryClient:e,queryKeys:t})=>{t.forEach(s=>{e.invalidateQueries({queryKey:s})})},H=({queryClient:e,queryKeys:t,data:s})=>{t.forEach(o=>{e.setQueryData(o,s)})};var _=({resourcePath:e,mutationOptions:t,mode:s={optimistic:!0,undoable:!0},extraResources:o=[],type:r="many"})=>{let{apiUrl:m,apiClient:i,apiEnsureTrailingSlash:a,toastUndo:u}=Q(),y=fe(),n=de([]),c=()=>{n.current.forEach(([l,p])=>{y.setQueryData(l,p)})},{mutate:P,...C}=he({...t,mutationKey:[r==="many"?"delete-many":"delete-one",e,...t?.mutationKey?t.mutationKey:[]],mutationFn:async l=>{let p=`${m}/${F(l.resource,!0)}`;if(t?.mutationFn)return await t?.mutationFn({apiClient:i,variables:l,url:p});let T=r==="many"?l.ids:[l.id],d=await Promise.allSettled(T.map(h=>i({url:`${p}${h}${a?"/":""}`,method:"DELETE",...l.apiClientParams}))),g=[];return d.forEach(h=>{if(h.status==="fulfilled")g.push(h.value);else throw h.reason}),r==="many"?g:g[0]},onSuccess:(...l)=>{let p=l[1],T=[f.getList(p.resource),f.getInfiniteList(p.resource)];o.forEach(d=>{T.push(f.getList(d)),T.push(f.getInfiniteList(d))}),S({queryClient:y,queryKeys:T}),t?.onSuccess&&t.onSuccess(...l)},onError:(...l)=>{t?.onError&&t.onError(...l),c()}});return{mutation:C,delete:async({resourceParams:l,undoMessage:p,...T})=>{let d={path:e,params:l},g=r==="many"?T.ids:[T.id];if(s.optimistic){let h=f.getOneArray(d,g),D=[f.getList(d)],b=[f.getInfiniteList(d)];o.forEach(x=>{h.push(...f.getOneArray(x,g)),D.push(f.getList(x)),b.push(f.getInfiniteList(x))}),n.current=await U(y,[...h,...D,...b]),N({queryClient:y,ids:g,queryKeysOne:h,queryKeysList:D,queryKeysInfiniteList:b})}if(s.undoable){let h=g.length>1;K.once("end",D=>{D?c():P({...T,resource:d})}),u({message:p||`Element${h?"s":""} deleted`,type:h?"delete-many":"delete-one"})}else P({...T,resource:d})}}},Rt=e=>_({...e,type:"one"}),bt=e=>_({...e,type:"many"});import{useMutation as Pe,useQueryClient as ge}from"@tanstack/react-query";import{useRef as De}from"react";var J=({resourcePath:e,mutationOptions:t,mode:s={optimistic:!0,undoable:!0},extraResources:o=[],type:r="many"})=>{let{apiUrl:m,apiClient:i,apiEnsureTrailingSlash:a,toastUndo:u}=Q(),y=ge(),n=De([]),c=()=>{n.current.forEach(([l,p])=>{y.setQueryData(l,p)})},{mutate:P,...C}=Pe({...t,mutationKey:[r==="many"?"update-many":"update-one",e,...t?.mutationKey?t.mutationKey:[]],mutationFn:async l=>{let p=`${m}/${F(l.resource,!0)}`;if(t?.mutationFn)return await t?.mutationFn({apiClient:i,variables:l,url:p});let T=r==="many"?l.ids:[l.id],d=await Promise.allSettled(T.map(h=>i({url:`${p}${h}${a?"/":""}`,method:"PATCH",data:l.data,...l.apiClientParams}))),g=[];return d.forEach(h=>{if(h.status==="fulfilled")g.push(h.value);else throw h.reason}),r==="many"?g:g[0]},onSuccess:(...l)=>{let p=l[1];if(!s.optimistic){let T=r==="many"?p.ids:[p.id],d=[...f.getOneArray(p.resource,T),f.getList(p.resource),f.getInfiniteList(p.resource)];o.forEach(g=>{d.push(...f.getOneArray(g,T)),d.push(f.getList(g)),d.push(f.getInfiniteList(g))}),S({queryClient:y,queryKeys:d})}t?.onSuccess&&t.onSuccess(...l)},onError:(...l)=>{t?.onError&&t.onError(...l),c()}});return{mutation:C,update:async({resourceParams:l,undoMessage:p,...T})=>{let d={path:e,params:l},g=r==="many"?T.ids:[T.id];if(s.optimistic){let h=f.getOneArray(d,g),D=[f.getList(d)],b=[f.getInfiniteList(d)];o.forEach(x=>{h.push(...f.getOneArray(x,g)),D.push(f.getList(x)),b.push(f.getInfiniteList(x))}),n.current=await U(y,[...h,...D,...b]),G({queryClient:y,data:T.data,ids:g,queryKeysOne:h,queryKeysList:D,queryKeysInfiniteList:b})}if(s.undoable){let h=g.length>1;K.once("end",D=>{D?c():P({...T,resource:d})}),u({message:p||`Element${h?"s":""} updated`,type:h?"update-many":"update-one"})}else P({...T,resource:d})}}},Ot=e=>J({...e,type:"one"}),qt=e=>J({...e,type:"many"});import{useMutation as Ce,useQueryClient as Fe}from"@tanstack/react-query";var jt=({resourcePath:e,mutationOptions:t,extraResources:s=[]})=>{let{apiUrl:o,apiClient:r,apiEnsureTrailingSlash:m}=Q(),i=Fe(),{mutate:a,...u}=Ce({...t,mutationKey:["create",e,...t?.mutationKey?t.mutationKey:[]],mutationFn:async n=>{let c=`${o}/${F(n.resource,m)}`;return t?.mutationFn?await t?.mutationFn({apiClient:r,variables:n,url:c}):await r({url:c,method:"POST",data:n.data,...n.apiClientParams})},onSuccess:(...n)=>{let c=n[0],P=n[1],{id:C}=c.data,R=[f.getOne(P.resource,C)],l=[f.getList(P.resource)],p=[f.getInfiniteList(P.resource)];s.forEach(T=>{R.push(f.getOne(T,C)),l.push(f.getList(T)),p.push(f.getInfiniteList(T))}),H({queryClient:i,queryKeys:R.map(T=>[...T,{}]),data:n[0]}),S({queryClient:i,queryKeys:[...l,...p]}),t?.onSuccess&&t.onSuccess(...n)}});return{mutation:u,create:({resourceParams:n,...c})=>{a({...c,resource:{path:e,params:n}})}}};export{M as CustomError,Je as RQWrapper,we as ToastBar,N as deleteItemsFromQueryCache,w as fetcher,F as getUrlFromResource,f as helpersQueryKeys,$e as resolveToastValue,B as toast,G as updateItemsFromQueryCache,jt as useCreate,bt as useDeleteMany,Rt as useDeleteOne,it as useGetInfiniteList,tt as useGetList,mt as useGetOne,Q as useRQWrapperContext,qt as useUpdateMany,Ot as useUpdateOne};
//# sourceMappingURL=index.mjs.map