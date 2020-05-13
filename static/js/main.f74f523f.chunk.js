(this["webpackJsonpworkout-client"]=this["webpackJsonpworkout-client"]||[]).push([[0],{100:function(e,t,a){},101:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(22),i=a.n(o),c=(a(84),a(58)),l=a(111),u=a(107),s=a(11),m=a(27),d=r.a.createContext({configured:!1,initialWorkoutTimerState:{intervalTime:-1,breakTime:-1,rounds:-1},currentWorkoutTimerState:{intervalTime:-1,breakTime:-1,rounds:-1},setConfigured:function(e){},setInitialWorkoutTimerState:function(e){},setCurrentWorkoutTimerState:function(e){}});var f=function(e){var t=Object(m.d)(),a=Object(m.e)(),o=function(e){var t=new URLSearchParams(e);return["true"===t.get("configured"),{intervalTime:parseInt(t.get("interval")||"-1")||-1,breakTime:parseInt(t.get("break")||"-1")||-1,rounds:parseInt(t.get("rounds")||"-1")||-1},{intervalTime:parseInt(t.get("currentInterval")||"0")||0,breakTime:parseInt(t.get("currentBreak")||"0")||0,rounds:parseInt(t.get("currentRounds")||"0")||0}]}(a.search),i=Object(n.useState)(o[0]),c=Object(s.a)(i,2),l=c[0],u=c[1],f=Object(n.useState)(o[1]),T=Object(s.a)(f,2),b=T[0],E=T[1],g=Object(n.useState)(o[2]),p=Object(s.a)(g,2),k=p[0],v=p[1];return Object(n.useEffect)((function(){var e=new URLSearchParams(a.search);e.set("configured","".concat(l)),e.set("interval","".concat(b.intervalTime)),e.set("break","".concat(b.breakTime)),e.set("rounds","".concat(b.rounds)),e.set("currentInterval","".concat(k.intervalTime)),e.set("currentBreak","".concat(k.breakTime)),e.set("currentRounds","".concat(k.rounds)),t.push("?".concat(e.toString()))}),[l,b,k,t,a.search]),r.a.createElement(d.Provider,{value:{configured:l,initialWorkoutTimerState:b,currentWorkoutTimerState:k,setConfigured:u,setInitialWorkoutTimerState:E,setCurrentWorkoutTimerState:v}},e.children)};var T,b=function(){var e=Object(n.useContext)(d),t=e.initialWorkoutTimerState,r=e.currentWorkoutTimerState,o=e.setCurrentWorkoutTimerState,i=Object(n.useState)(!1),c=Object(s.a)(i,2),l=c[0],u=c[1],m=Object(n.useState)(!1),f=Object(s.a)(m,2),T=f[0],b=f[1],E=a(90),g=a(91),p=new Audio,k=new Audio;return Object(n.useEffect)((function(){l&&0===r.rounds?(u(!1),b(!0)):setTimeout((function(){l&&(r.rounds>0&&r.intervalTime>0?(1===r.intervalTime&&(p.src=E,p.volume=.5,p.defaultMuted=!1,p.muted=!1,p.play()),o({intervalTime:r.intervalTime-1,breakTime:r.breakTime,rounds:r.rounds})):r.rounds>1&&r.breakTime>0?(1===r.breakTime&&(k.src=g,k.defaultMuted=!1,k.muted=!1,k.play()),o({intervalTime:r.intervalTime,breakTime:r.breakTime-1,rounds:r.rounds})):r.rounds>0&&(1===r.rounds?o({intervalTime:r.intervalTime,breakTime:r.breakTime,rounds:r.rounds-1}):o({intervalTime:t.intervalTime,breakTime:t.breakTime,rounds:r.rounds-1})))}),1e3)}),[l,r,t,o]),{setCountDown:u,initializePlayAudio:function(){p.play(),k.play()},resetWorkout:function(){u(!1),b(!1),o(t)},done:T}},E=a(115),g=a(106),p=a(65),k=a(113),v=a(116),N=function(e){var t=Object(n.useContext)(d),a=t.initialWorkoutTimerState,o=t.setInitialWorkoutTimerState,i=t.setCurrentWorkoutTimerState,c=t.configured,l=t.setConfigured,m=Object(n.useState)(a.intervalTime),f=Object(s.a)(m,2),T=f[0],b=f[1],N=Object(n.useState)(a.breakTime),h=Object(s.a)(N,2),S=h[0],w=h[1],O=Object(n.useState)(a.rounds),I=Object(s.a)(O,2),C=I[0],j=I[1],P=Object(n.useState)(!0),x=Object(s.a)(P,2),y=x[0],W=x[1],D=Object(n.useState)(!0),U=Object(s.a)(D,2),A=U[0],R=U[1];return r.a.createElement(E.a,{id:"card-fg"},r.a.createElement(E.a.Body,null,r.a.createElement(E.a.Title,{id:"card-title-fg"},"Configuration"),r.a.createElement(g.a,{as:p.a,className:"mb-3"},r.a.createElement(g.a.Prepend,null,r.a.createElement(g.a.Text,null,"Interval Time")),r.a.createElement(k.a.Control,{bsPrefix:"form-control form-fg",type:"text",pattern:"[0-9]*",placeholder:"interval time in sec",isInvalid:!A,value:T<0?"":T,onChange:function(e){isNaN(parseInt(e.currentTarget.value))||0===e.currentTarget.value.length?b(-1):b(parseInt(e.currentTarget.value))},disabled:c}),r.a.createElement(g.a.Append,null,r.a.createElement(g.a.Text,{id:"prepend-radius"},"sec\xa0\xa0\xa0\xa0\xa0\xa0\xa0")),r.a.createElement(k.a.Control.Feedback,{type:"invalid"},"Please set a numerical Interval Time e.g. ",r.a.createElement("strong",null,"20"),".")),r.a.createElement(g.a,{as:p.a,className:"mb-3"},r.a.createElement(g.a.Prepend,null,r.a.createElement(g.a.Text,null,"\xa0\xa0\xa0Break Time")),r.a.createElement(k.a.Control,{bsPrefix:"form-control form-fg",type:"text",pattern:"[0-9]*",placeholder:"break time in sec",value:S<0?"":S,onChange:function(e){isNaN(parseInt(e.currentTarget.value))||0===e.currentTarget.value.length?w(-1):w(parseInt(e.currentTarget.value))},disabled:c}),r.a.createElement(g.a.Append,null,r.a.createElement(g.a.Text,null,"sec\xa0\xa0\xa0\xa0\xa0\xa0\xa0"))),r.a.createElement(g.a,{as:p.a,className:"mb-3"},r.a.createElement(g.a.Prepend,null,r.a.createElement(g.a.Text,null,"\xa0\xa0\xa0\xa0\xa0# Rounds")),r.a.createElement(k.a.Control,{bsPrefix:"form-control form-fg",type:"text",pattern:"[0-9]*",placeholder:"# rounds",isInvalid:!y,value:C<0?"":C,onChange:function(e){isNaN(parseInt(e.currentTarget.value))||0===e.currentTarget.value.length?j(-1):j(parseInt(e.currentTarget.value))},disabled:c}),r.a.createElement(g.a.Append,null,r.a.createElement(g.a.Text,{id:"prepend-radius"},"Rounds")),r.a.createElement(k.a.Control.Feedback,{type:"invalid"},"Please set a numerical # Rounds e.g. ",r.a.createElement("strong",null,"1"),".")),r.a.createElement(u.a,{className:"justify-content-center"},r.a.createElement(v.a,{id:"button-fg",className:"mr-2",onClick:function(){if(T>0&&C>0){W(!0),R(!0),l(!0);var e={intervalTime:T,breakTime:0===S?-1:S,rounds:C};o(e),i(e)}else T>0?(R(!0),W(!1)):C>0?(W(!0),R(!1)):(W(!1),R(!1))},disabled:c},"Submit"),r.a.createElement(v.a,{id:"button-fg",className:"ml-2",onClick:function(){l(!1),e.setCountDown(!1)},disabled:!c},"Configure"))))},h=a(74),S=a.n(h),w=a(117),O=a(110),I=a(66),C=a.n(I),j=a(112),P=a(114),x=a(109),y=function(e){return r.a.createElement(j.a,{show:e.show,size:"lg",centered:!0},r.a.createElement(j.a.Header,{className:"modal-head-fg"},r.a.createElement(j.a.Title,{id:"contained-modal-title-vcenter"},e.completedSuccessfull?"WUHUUUUU!":"Stop Workout?")),r.a.createElement(j.a.Body,{className:"modal-rest-fg"},r.a.createElement("h5",null,e.completedSuccessfull?"You completed your Workout! Congrats!":"Do you really want to stop your Workout?")),r.a.createElement(j.a.Footer,{className:"modal-rest-fg"},r.a.createElement(v.a,{hidden:e.completedSuccessfull,id:"button-fg",onClick:function(){return e.quit()}},"Continue Workout"),r.a.createElement(P.a,{trigger:"click",placement:"top",overlay:r.a.createElement(x.a,{id:"resetTooltip"},"Reseting the Workout")},r.a.createElement(v.a,{id:"button-fg",onClick:function(){return new Promise((function(e){return setTimeout(e,500)})).then((function(t){return e.reset()}))}},e.completedSuccessfull?"Close":"Stop Workout"))))},W=a(71),D=a.n(W),U=a(72),A=a.n(U),R=a(73),B=a.n(R),L=function(e){var t=Object(n.useState)(!1),a=Object(s.a)(t,2),o=a[0],i=a[1],c=Object(n.useState)(!1),l=Object(s.a)(c,2),u=l[0],m=l[1],d=Object(n.useState)(!1),f=Object(s.a)(d,2),T=f[0],b=f[1];return Object(n.useEffect)((function(){e.start&&i(!0)}),[e.start]),o?r.a.createElement(j.a,{className:"fade_in_number_modal",show:o,size:"sm",centered:!0,onShow:function(){return new Promise((function(e){return setTimeout(e,1e3)})).then((function(e){i(!1),m(!0)}))},scrollable:!1},r.a.createElement("img",{alt:"",src:D.a,width:"80%",height:"80%"})):u?r.a.createElement(j.a,{className:"fade_in_number_modal",show:u,size:"sm",centered:!0,onShow:function(){return new Promise((function(e){return setTimeout(e,1e3)})).then((function(e){m(!1),b(!0)}))},scrollable:!1},r.a.createElement("img",{alt:"",src:A.a,width:"80%",height:"80%"})):T?r.a.createElement(j.a,{className:"fade_in_number_modal",show:T,size:"sm",centered:!0,onShow:function(){return new Promise((function(e){return setTimeout(e,1e3)})).then((function(e){b(!1)}))},scrollable:!1},r.a.createElement("img",{alt:"",src:B.a,width:"80%",height:"80%"})):r.a.createElement(r.a.Fragment,null)};!function(e){e[e.INITIAL=0]="INITIAL",e[e.RUNNING=1]="RUNNING",e[e.PAUSED=2]="PAUSED",e[e.STOPPED=3]="STOPPED",e[e.DONE=4]="DONE"}(T||(T={}));var _=function(e){var t=S()(),o=t.width,i=t.height,c=Object(n.useState)(!1),l=Object(s.a)(c,2),m=l[0],f=l[1],b=Object(n.useContext)(d),g=b.initialWorkoutTimerState,p=b.currentWorkoutTimerState,k=p.intervalTime===g.intervalTime&&p.breakTime===g.breakTime&&p.rounds===g.rounds?T.INITIAL:T.PAUSED,N=Object(n.useState)(k),h=Object(s.a)(N,2),I=h[0],j=h[1],P=new Audio(a(99));P.addEventListener("ended",(function(){f(!1),j(T.RUNNING)})),P.addEventListener("playing",(function(){f(!0)}));return Object(n.useEffect)((function(){e.workoutTimerControl.done&&j(T.DONE)}),[e.workoutTimerControl.done]),Object(n.useEffect)((function(){switch(I){case T.INITIAL:e.workoutTimerControl.resetWorkout();break;case T.RUNNING:e.workoutTimerControl.setCountDown(!0);break;case T.PAUSED:case T.STOPPED:e.workoutTimerControl.setCountDown(!1)}}),[I,e.workoutTimerControl]),r.a.createElement(r.a.Fragment,null,I===T.DONE&&r.a.createElement(C.a,{width:o,height:i,run:I===T.DONE}),r.a.createElement(L,{start:m}),r.a.createElement(y,{show:I===T.DONE||I===T.STOPPED,completedSuccessfull:I===T.DONE,reset:function(){return j(T.INITIAL)},quit:function(){return j(T.PAUSED)}}),r.a.createElement(E.a,{id:"card-fg"},r.a.createElement(E.a.Body,null,r.a.createElement(E.a.Title,{id:"card-title-fg"},"Workout"),r.a.createElement(E.a.Text,{className:"mt-3 ml-3 mr-3"},g.intervalTime," sec PUSH -\xa0",Math.max(0,g.breakTime)," sec REST -\xa0",g.rounds," times"),r.a.createElement(E.a.Text,{className:"mt-3 ml-3 mr-3"},g.rounds-p.rounds,"/",g.rounds," Rounds"),r.a.createElement(u.a,{xs:"1",className:"mt-3 ml-3 mr-3"},r.a.createElement(w.a,{bsPrefix:"fg-progress",animated:!0,now:p.intervalTime,label:"".concat(p.intervalTime,"sec"),max:g.intervalTime})),p.breakTime>=0&&p.rounds>1&&r.a.createElement(u.a,{xs:"1",className:"mt-3 ml-3 mr-3"},r.a.createElement(w.a,{bsPrefix:"fgl-progress",animated:!0,now:p.breakTime,label:"".concat(p.breakTime,"sec"),max:g.breakTime})),r.a.createElement(u.a,{className:"mt-3 justify-content-center"},r.a.createElement(O.a,{"aria-label":"Toolbar with button groups"},r.a.createElement(v.a,{id:"button-fg",className:"mr-2",size:"lg",active:!0,onClick:function(){I===T.INITIAL?(P.play(),e.workoutTimerControl.initializePlayAudio()):j(T.RUNNING)},disabled:I===T.RUNNING||m||0===g.intervalTime||0===g.rounds},I!==T.INITIAL||m?"Continue":"Start"),r.a.createElement(v.a,{variant:"secondary",className:"mr-2",active:!0,onClick:function(){return j(T.PAUSED)},disabled:I!==T.RUNNING},"Break"),r.a.createElement(v.a,{id:"button-fg",className:"mr-2",size:"lg",active:!0,onClick:function(){return j(T.STOPPED)},disabled:I!==T.RUNNING&&I!==T.PAUSED},"Stop"))))))},z=function(){var e=b(),t=Object(n.useContext)(d).configured;return r.a.createElement(l.a,null,r.a.createElement(u.a,{className:"mt-3 justify-content-center"},r.a.createElement(N,{setCountDown:e.setCountDown})),t&&r.a.createElement(u.a,{className:"mt-3 justify-content-center"},r.a.createElement(_,{workoutTimerControl:e})))},G=a(75),F=a.n(G),M=(a(100),function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("header",null,r.a.createElement(c.a,{bg:"fg",variant:"dark",fixed:"top"},r.a.createElement(c.a.Brand,{href:"#home"},r.a.createElement("img",{alt:"",src:F.a,width:"30",height:"30",className:"spin-logo d-inline-block align-top"}),"\xa0\xa0WorkoutApp"))),r.a.createElement("main",{style:{paddingTop:"50px"}}," ",r.a.createElement(f,null,r.a.createElement(z,null))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var H=a(54),q=document.getElementById("root"),J=r.a.createElement(r.a.StrictMode,null,r.a.createElement(H.a,null,r.a.createElement(M,null)));i.a.render(J,q),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},71:function(e,t,a){e.exports=a.p+"static/media/3.119c6f28.svg"},72:function(e,t,a){e.exports=a.p+"static/media/2.e8953c22.svg"},73:function(e,t,a){e.exports=a.p+"static/media/1.a3c5ea73.svg"},75:function(e,t,a){e.exports=a.p+"static/media/favicon.8b677943.svg"},79:function(e,t,a){e.exports=a(101)},90:function(e,t,a){e.exports=a.p+"static/media/beforeBreak.49a3fd61.mp3"},91:function(e,t,a){e.exports=a.p+"static/media/beforeInterval.f739559a.wav"},99:function(e,t,a){e.exports=a.p+"static/media/beforeStart321.28fa21c0.wav"}},[[79,1,2]]]);
//# sourceMappingURL=main.f74f523f.chunk.js.map