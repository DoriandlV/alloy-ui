/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.1.0
build: nightly
*/
YUI.add("dataschema-json",function(C){var A=C.Lang,B={getPath:function(D){var G=null,F=[],E=0;if(D){D=D.replace(/\[(['"])(.*?)\1\]/g,function(I,H,J){F[E]=J;return".@"+(E++);}).replace(/\[(\d+)\]/g,function(I,H){F[E]=parseInt(H,10)|0;return".@"+(E++);}).replace(/^\./,"");if(!/[^\w\.\$@]/.test(D)){G=D.split(".");for(E=G.length-1;E>=0;--E){if(G[E].charAt(0)==="@"){G[E]=F[parseInt(G[E].substr(1),10)];}}}else{}}return G;},getLocationValue:function(G,F){var E=0,D=G.length;for(;E<D;E++){if(A.isObject(F)&&(G[E] in F)){F=F[G[E]];}else{F=undefined;break;}}return F;},apply:function(F,G){var D=G,E={results:[],meta:{}};if(!A.isObject(G)){try{D=C.JSON.parse(G);}catch(H){E.error=H;return E;}}if(A.isObject(D)&&F){if(!A.isUndefined(F.resultListLocator)){E=B._parseResults(F,D,E);}if(!A.isUndefined(F.metaFields)){E=B._parseMeta(F.metaFields,D,E);}}else{E.error=new Error("JSON schema parse failure");}return E;},_parseResults:function(H,D,G){var F=[],I,E;if(H.resultListLocator){I=B.getPath(H.resultListLocator);if(I){F=B.getLocationValue(I,D);if(F===undefined){G.results=[];E=new Error("JSON results retrieval failure");}else{if(A.isArray(F)){if(A.isArray(H.resultFields)){G=B._getFieldValues(H.resultFields,F,G);}else{G.results=F;}}else{G.results=[];E=new Error("JSON Schema fields retrieval failure");}}}else{E=new Error("JSON Schema results locator failure");}if(E){G.error=E;}}return G;},_getFieldValues:function(K,P,E){var G=[],M=K.length,H,F,O,Q,S,D,J=[],N=[],L=[],R,I;for(H=0;H<M;H++){O=K[H];Q=O.key||O;S=B.getPath(Q);if(S){if(S.length===1){J[J.length]={key:Q,path:S[0]};}else{N[N.length]={key:Q,path:S};}}else{}D=(A.isFunction(O.parser))?O.parser:C.Parsers[O.parser+""];if(D){L[L.length]={key:Q,parser:D};}}for(H=P.length-1;H>=0;--H){I={};R=P[H];if(R){for(F=J.length-1;F>=0;--F){I[J[F].key]=C.DataSchema.Base.parse((A.isUndefined(R[J[F].path])?R[F]:R[J[F].path]),J[F]);}for(F=N.length-1;F>=0;--F){I[N[F].key]=C.DataSchema.Base.parse((B.getLocationValue(N[F].path,R)),N[F]);}for(F=L.length-1;F>=0;--F){Q=L[F].key;I[Q]=L[F].parser(I[Q]);if(A.isUndefined(I[Q])){I[Q]=null;}}G[H]=I;}}E.results=G;return E;},_parseMeta:function(G,D,F){if(A.isObject(G)){var E,H;for(E in G){if(G.hasOwnProperty(E)){H=B.getPath(G[E]);if(H&&D){F.meta[E]=B.getLocationValue(H,D);}}}}else{F.error=new Error("JSON meta data retrieval failure");}return F;}};C.DataSchema.JSON=C.mix(B,C.DataSchema.Base);},"3.1.0",{requires:["json","dataschema-base"]});