export default {
  changeColor:function(time)
{
  let color=parseInt(this.$parent.bgc.match(/[0-9]+/))
  let interval=time/245
  let num=1;
  if(color===255)
   num=-1

  const id = window.setInterval(() => {
      color+=num
      let newColor=`rgb(${color},${color},${color})`
      this.$parent.bgc = newColor
      if(color===255 || color===10)
        window.clearInterval(id)
    }, interval)

}
}
