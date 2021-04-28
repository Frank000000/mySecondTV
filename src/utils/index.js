// 屏幕缩放
export function screenSize(editorDom) {
  let screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
  let screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
  let defWidth = 1920;
  let defHeight = 1080;
  let xScale = screenWidth / defWidth;
  let yScale = screenHeight / defHeight;
  editorDom.style.cssText += ';transform: scale(' + xScale + ',' + yScale + ')';

  $(window).resize(() => {
    let screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
    let screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
    xScale = screenWidth / defWidth;
    yScale = screenHeight / defHeight;
    editorDom.style.cssText += ';transform: scale(' + xScale + ',' + yScale + ')';
  })
}

// 屏幕缩放
export function formatTime(timeStamp, type) {
  let time
  if(type === 1) {
    time = timeStamp.split(" ")
    let t = new Date(time[0])
    console.log(time,t);
    time = `${t.getMonth() + 1}月${t.getDate()}日 ${time[1]}` 
  }
  return time
}