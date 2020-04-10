(this["webpackJsonpworkout-client"]=this["webpackJsonpworkout-client"]||[]).push([[0],{60:function(e,t,r){e.exports=r.p+"static/media/favicon.8b677943.svg"},63:function(e,t,r){e.exports=r(74)},73:function(e,t,r){},74:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),o=r(10),i=r.n(o),l=(r(68),r(51)),c=r(15),u=r(36),m=r(26),s=r(50),d=r(34),T=r(28),f=r(12),k=r(25),E=r(59),b=r(52);function g(e){return new Promise((function(t){return setTimeout(t,e)}))}var p=function(){var e=Object(a.useState)({intervalTime:0,breakTime:0,rounds:0}),t=Object(c.a)(e,2),r=t[0],n=t[1],o=Object(a.useState)(r),i=Object(c.a)(o,2),l=i[0],u=i[1],m=Object(a.useState)(!1),s=Object(c.a)(m,2),d=s[0],T=s[1],f=Object(a.useState)(!1),k=Object(c.a)(f,2),E=k[0],b=k[1],p=new Audio("https://raw.githubusercontent.com/jkling2/workout-timer/master/public/sounds/beforeBreak.mp3"),N=new Audio("https://raw.githubusercontent.com/jkling2/workout-timer/master/public/sounds/beforeInterval.wav");N.volume=.5;var w=function(e){return e.play()};return Object(a.useEffect)((function(){u(r)}),[r]),Object(a.useEffect)((function(){d&&l.rounds>0&&l.intervalTime>0?g(1e3).then((function(e){if(1===l.intervalTime)return w(p)})).then((function(e){return u({intervalTime:l.intervalTime-1,breakTime:l.breakTime,rounds:l.rounds})})):d&&l.rounds>1&&l.breakTime>0?g(1e3).then((function(e){if(1===l.breakTime)return w(N)})).then((function(e){return u({intervalTime:l.intervalTime,breakTime:l.breakTime-1,rounds:l.rounds})})):d&&l.rounds>0?g(1e3).then((function(e){1===l.rounds?u({intervalTime:l.intervalTime,breakTime:l.breakTime,rounds:l.rounds-1}):u({intervalTime:r.intervalTime,breakTime:r.breakTime,rounds:l.rounds-1})})):d&&0===l.rounds&&(T(!1),b(!0))}),[d,l,r,p,N]),{initialWorkoutTimerState:r,setInitialWorkoutTimerState:n,currentWorkoutTimerState:l,setCountDown:T,resetWorkout:function(){T(!1),b(!1),u(r)},done:E}},N=r(35),w=r(61),S=r(58),C=function(e){return n.a.createElement(N.a,{show:e.show,size:"lg",centered:!0},n.a.createElement(N.a.Header,{className:"modal-head-fg"},n.a.createElement(N.a.Title,{id:"contained-modal-title-vcenter"},e.completedSuccessfull?"WUHUUUUU!":"Stop Workout?")),n.a.createElement(N.a.Body,{className:"modal-rest-fg"},n.a.createElement("h5",null,e.completedSuccessfull?"You completed your Workout! Congrats!":"Do you really want to stop your Workout?")),n.a.createElement(N.a.Footer,{className:"modal-rest-fg"},n.a.createElement(k.a,{hidden:e.completedSuccessfull,id:"button-fg",onClick:function(){return e.quit()}},"Continue Workout"),n.a.createElement(w.a,{trigger:"click",placement:"top",overlay:n.a.createElement(S.a,{id:"resetTooltip"},"Reseting the Workout")},n.a.createElement(k.a,{id:"button-fg",onClick:function(){return new Promise((function(e){return setTimeout(e,1e3)})).then((function(t){return e.reset()}))}},e.completedSuccessfull?"Close":"Stop Workout"))))},v=function(e){var t=Object(a.useState)(-1),r=Object(c.a)(t,2),o=r[0],i=r[1],l=Object(a.useState)(-1),s=Object(c.a)(l,2),E=s[0],b=s[1],g=Object(a.useState)(-1),p=Object(c.a)(g,2),N=p[0],w=p[1],S=Object(a.useState)(!0),C=Object(c.a)(S,2),v=C[0],I=C[1],h=Object(a.useState)(!0),O=Object(c.a)(h,2),j=O[0],W=O[1];return n.a.createElement(m.a,{id:"card-fg"},n.a.createElement(m.a.Body,null,n.a.createElement(m.a.Title,{id:"card-title-fg"},"Configuration"),n.a.createElement(f.a,{as:d.a,className:"mb-3"},n.a.createElement(f.a.Prepend,null,n.a.createElement(f.a.Text,null,"Interval Time")),n.a.createElement(u.a.Control,{bsPrefix:"form-control form-fg",type:"text",pattern:"[0-9]*",placeholder:"interval time in sec",isInvalid:!j,onChange:function(e){return i(parseInt(e.currentTarget.value))},disabled:e.configured}),n.a.createElement(f.a.Append,null,n.a.createElement(f.a.Text,{id:"prepend-radius"},"sec\xa0\xa0\xa0\xa0\xa0\xa0\xa0")),n.a.createElement(u.a.Control.Feedback,{type:"invalid"},"Please set a numerical Interval Time e.g. ",n.a.createElement("strong",null,"20"),".")),n.a.createElement(f.a,{as:d.a,className:"mb-3"},n.a.createElement(f.a.Prepend,null,n.a.createElement(f.a.Text,null,"\xa0\xa0\xa0Break Time")),n.a.createElement(u.a.Control,{bsPrefix:"form-control form-fg",type:"text",pattern:"[0-9]*",placeholder:"break time in sec",onChange:function(e){return b(parseInt(e.currentTarget.value))},disabled:e.configured}),n.a.createElement(f.a.Append,null,n.a.createElement(f.a.Text,null,"sec\xa0\xa0\xa0\xa0\xa0\xa0\xa0"))),n.a.createElement(f.a,{as:d.a,className:"mb-3"},n.a.createElement(f.a.Prepend,null,n.a.createElement(f.a.Text,null,"\xa0\xa0\xa0\xa0\xa0# Rounds")),n.a.createElement(u.a.Control,{bsPrefix:"form-control form-fg",type:"text",pattern:"[0-9]*",placeholder:"# rounds",isInvalid:!v,onChange:function(e){return w(parseInt(e.currentTarget.value))},disabled:e.configured}),n.a.createElement(f.a.Append,null,n.a.createElement(f.a.Text,{id:"prepend-radius"},"Rounds")),n.a.createElement(u.a.Control.Feedback,{type:"invalid"},"Please set a numerical # Rounds e.g. ",n.a.createElement("strong",null,"1"),".")),n.a.createElement(T.a,{className:"justify-content-center"},n.a.createElement(k.a,{id:"button-fg",className:"mr-2",onClick:function(){o>0&&N>0?(I(!0),W(!0),e.setConfigured(!0),e.workoutTimerControl.setInitialWorkoutTimerState({intervalTime:o,breakTime:isNaN(E)?-1:E,rounds:N})):o>0?(W(!0),I(!1)):N>0?(I(!0),W(!1)):(I(!1),W(!1))},disabled:e.configured},"Submit"),n.a.createElement(k.a,{id:"button-fg",className:"ml-2",onClick:function(){e.setConfigured(!1),e.workoutTimerControl.setCountDown(!1)},disabled:!e.configured},"Configure"))))},I=function(e){var t,r=Object(a.useState)(!1),o=Object(c.a)(r,2),i=o[0],l=o[1];!function(e){e[e.INITIAL=0]="INITIAL",e[e.RUNNING=1]="RUNNING",e[e.PAUSED=2]="PAUSED",e[e.STOPPED=3]="STOPPED",e[e.DONE=4]="DONE"}(t||(t={}));var u=Object(a.useState)(t.INITIAL),s=Object(c.a)(u,2),d=s[0],f=s[1],g=new Audio("https://raw.githubusercontent.com/jkling2/workout-timer/master/public/sounds/beforeStart321.wav");g.addEventListener("ended",(function(){l(!1),f(t.RUNNING)}));Object(a.useEffect)((function(){e.workoutTimerControl.done&&f(t.DONE)}),[e.workoutTimerControl.done,t.DONE]),Object(a.useEffect)((function(){switch(d){case t.INITIAL:e.workoutTimerControl.resetWorkout();break;case t.RUNNING:e.workoutTimerControl.setCountDown(!0);break;case t.PAUSED:case t.STOPPED:e.workoutTimerControl.setCountDown(!1)}}),[d,t.INITIAL,t.RUNNING,t.PAUSED,t.STOPPED,e.workoutTimerControl]);var p=function(){return e.workoutTimerControl.currentWorkoutTimerState.breakTime>=0&&e.workoutTimerControl.currentWorkoutTimerState.rounds>1?n.a.createElement(T.a,{xs:"1",className:"mt-3 ml-3 mr-3"},n.a.createElement(b.a,{bsPrefix:"fgl-progress",animated:!0,now:e.workoutTimerControl.currentWorkoutTimerState.breakTime,label:"".concat(e.workoutTimerControl.currentWorkoutTimerState.breakTime,"sec"),max:e.workoutTimerControl.initialWorkoutTimerState.breakTime})):n.a.createElement(n.a.Fragment,null," ")};return n.a.createElement(n.a.Fragment,null,n.a.createElement(C,{show:d===t.DONE||d===t.STOPPED,completedSuccessfull:d===t.DONE,reset:function(){return f(t.INITIAL)},quit:function(){return f(t.PAUSED)}}),n.a.createElement(m.a,{id:"card-fg"},n.a.createElement(m.a.Body,null,n.a.createElement(m.a.Title,{id:"card-title-fg"},"Workout"),n.a.createElement(m.a.Text,{className:"mt-3 ml-3 mr-3"},e.workoutTimerControl.initialWorkoutTimerState.intervalTime," sec PUSH -\xa0",e.workoutTimerControl.initialWorkoutTimerState.breakTime," sec REST -\xa0",e.workoutTimerControl.initialWorkoutTimerState.rounds," times"),n.a.createElement(m.a.Text,{className:"mt-3 ml-3 mr-3"},e.workoutTimerControl.initialWorkoutTimerState.rounds-e.workoutTimerControl.currentWorkoutTimerState.rounds,"/",e.workoutTimerControl.initialWorkoutTimerState.rounds," Rounds"),n.a.createElement(T.a,{xs:"1",className:"mt-3 ml-3 mr-3"},n.a.createElement(b.a,{bsPrefix:"fg-progress",animated:!0,now:e.workoutTimerControl.currentWorkoutTimerState.intervalTime,label:"".concat(e.workoutTimerControl.currentWorkoutTimerState.intervalTime,"sec"),max:e.workoutTimerControl.initialWorkoutTimerState.intervalTime})),n.a.createElement(p,null),n.a.createElement(T.a,{className:"mt-3 justify-content-center"},n.a.createElement(E.a,{"aria-label":"Toolbar with button groups"},n.a.createElement(k.a,{id:"button-fg",className:"mr-2",size:"lg",active:!0,onClick:function(){d===t.INITIAL?(l(!0),g.play()):f(t.RUNNING)},disabled:d===t.RUNNING||i||0===e.workoutTimerControl.initialWorkoutTimerState.intervalTime||0===e.workoutTimerControl.initialWorkoutTimerState.rounds},d!==t.INITIAL||i?"Continue":"Start"),n.a.createElement(k.a,{variant:"secondary",className:"mr-2",active:!0,onClick:function(){return f(t.PAUSED)},disabled:d!==t.RUNNING},"Break"),n.a.createElement(k.a,{id:"button-fg",className:"mr-2",size:"lg",active:!0,onClick:function(){return f(t.STOPPED)},disabled:d!==t.RUNNING&&d!==t.PAUSED},"Stop"))))))},h=function(){var e=p(),t=Object(a.useState)(!1),r=Object(c.a)(t,2),o=r[0],i=r[1];return o?n.a.createElement(n.a.Fragment,null,n.a.createElement(s.a,null,n.a.createElement(T.a,{className:"mt-3 justify-content-center"},n.a.createElement(v,{workoutTimerControl:e,configured:o,setConfigured:i})),n.a.createElement(T.a,{className:"mt-3 justify-content-center"},n.a.createElement(I,{workoutTimerControl:e})))):n.a.createElement(n.a.Fragment,null,n.a.createElement(s.a,null,n.a.createElement(T.a,{className:"mt-3 justify-content-center"},n.a.createElement(v,{workoutTimerControl:e,configured:o,setConfigured:i}))))},O=r(60),j=r.n(O),W=(r(73),function(){return n.a.createElement(n.a.Fragment,null,n.a.createElement("header",null,n.a.createElement(l.a,{bg:"fg",variant:"dark",fixed:"top"},n.a.createElement(l.a.Brand,{href:"#home"},n.a.createElement("img",{alt:"",src:j.a,width:"30",height:"30",className:"spin-logo d-inline-block align-top"}),"\xa0\xa0WorkoutApp"))),n.a.createElement("main",{style:{paddingTop:"50px"}},n.a.createElement(h,null)))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(W,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[63,1,2]]]);
//# sourceMappingURL=main.25ff0911.chunk.js.map