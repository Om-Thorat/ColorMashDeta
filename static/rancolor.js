console.log("HEYYY")
let root = document.querySelector(':root')
let ColorVars = getComputedStyle(root)
colors = ['#000000', '#330000', '#660000', '#990000', '#CC0000', '#FF0000', '#003300', '#333300', '#663300', '#993300', '#CC3300', '#FF3300', '#006600', '#336600', '#666600', '#996600', '#CC6600', '#FF6600', '#009900', '#339900', '#669900', '#999900', '#CC9900', '#FF9900', '#00CC00', '#33CC00', '#66CC00', '#99CC00', '#CCCC00', '#FFCC00', '#00FF00', '#33FF00', '#66FF00', '#99FF00', '#CCFF00', '#FFFF00', '#000033', '#330033', '#660033', '#990033', '#CC0033', '#FF0033', '#003333', '#333333', '#663333', '#993333', '#CC3333', '#FF3333', '#006633', '#336633', '#666633', '#996633', '#CC6633', '#FF6633', '#009933', '#339933', '#669933', '#999933', '#CC9933', '#FF9933', '#00CC33', '#33CC33', '#66CC33', '#99CC33', '#CCCC33', '#FFCC33', '#00FF33', '#33FF33', '#66FF33', '#99FF33', '#CCFF33', '#FFFF33', '#000066', '#330066', '#660066', '#990066', '#CC0066', '#FF0066', '#003366', '#333366', '#663366', '#993366', '#CC3366', '#FF3366', '#006666', '#336666', '#666666', '#996666', '#CC6666', '#FF6666', '#009966', '#339966', '#669966', '#999966', '#CC9966', '#FF9966', '#00CC66', '#33CC66', '#66CC66', '#99CC66', '#CCCC66', '#FFCC66', '#00FF66', '#33FF66', '#66FF66', '#99FF66', '#CCFF66', '#FFFF66', '#000099', '#330099', '#660099', '#990099', '#CC0099', '#FF0099', '#003399', '#333399', '#663399', '#993399', '#CC3399', '#FF3399', '#006699', '#336699', '#666699', '#996699', '#CC6699', '#FF6699', '#009999', '#339999', '#669999', '#999999', '#CC9999', '#FF9999', '#00CC99', '#33CC99', '#66CC99', '#99CC99', '#CCCC99', '#FFCC99', '#00FF99', '#33FF99', '#66FF99', '#99FF99', '#CCFF99', '#FFFF99', '#0000CC', '#3300CC', '#6600CC', '#9900CC', '#CC00CC', '#FF00CC', '#0033CC', '#3333CC', '#6633CC', '#9933CC', '#CC33CC', '#FF33CC', '#0066CC', '#3366CC', '#6666CC', '#9966CC', '#CC66CC', '#FF66CC', '#0099CC', '#3399CC', '#6699CC', '#9999CC', '#CC99CC', '#FF99CC', '#00CCCC', '#33CCCC', '#66CCCC', '#99CCCC', '#CCCCCC', '#FFCCCC', '#00FFCC', '#33FFCC', '#66FFCC', '#99FFCC', '#CCFFCC', '#FFFFCC', '#0000FF', '#3300FF', '#6600FF', '#9900FF', '#CC00FF', '#FF00FF', '#0033FF', '#3333FF', '#6633FF', '#9933FF', '#CC33FF', '#FF33FF', '#0066FF', '#3366FF', '#6666FF', '#9966FF', '#CC66FF', '#FF66FF', '#0099FF', '#3399FF', '#6699FF', '#9999FF', '#CC99FF', '#FF99FF', '#00CCFF', '#33CCFF', '#66CCFF', '#99CCFF', '#CCCCFF', '#FFCCFF', '#00FFFF', '#33FFFF', '#66FFFF', '#99FF9F', '#CCFFFF', '#FFFFFF']
//c3 c4 are the right hand sided combo while c1 c2 is the left
//if the used liked 1 ie the left then the right ie 3,4 has to be changed and vice versa
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function liked1(){
	var c3 = colors[Math.floor(Math.random()*colors.length)]
	var c4 = colors[Math.floor(Math.random()*colors.length)]
	document.getElementById("col3").style.background = c3
	document.getElementById("col4").style.background = c4
	document.getElementById('heart2').style.fill = c4
	root.style.setProperty('--color3',c3)
	root.style.setProperty('--color4',c4)
	var uh = []
	uh.push(c3)
	uh.push(c4)
	uh.sort()
	$.ajax({
		type: "POST",
		url: '/voteL',
		data: JSON.stringify({
			"colorcombo": uh[0] + uh[1],
			"pos": "right"
		}),
		dataType: 'json',
		contentType: "application/json",
	})
}
function liked2(){
	var c1 = colors[Math.floor(Math.random()*colors.length)]
	var c2 = colors[Math.floor(Math.random()*colors.length)]
	document.getElementById("col1").style.background = c1
	document.getElementById("col2").style.background = c2
	document.getElementById('heart1').style.fill = c1
	root.style.setProperty('--color1',c1)
	root.style.setProperty('--color2',c2)
	var uh = []
	uh.push(c1)
	uh.push(c2)
	uh.sort()
	$.ajax({
		type: "POST",
		url: '/voteR',
		data: JSON.stringify({
			"colorcombo": uh[0] + uh[1],
			"pos": "left"
		}),
		dataType: 'json',
		contentType: "application/json",
	})
}
async function really(liked1,liked2){
liked1()
liked2()
}
really(liked1,liked2)

//My cool cool function to make a hexcode. RIP.

// chars = '0123456789ABCDEF'
// var c1 = ""
// for(i = 0;i < 6;i++){
// 	c1 = c1 + chars[Math.floor(Math.random()*16)]
// }	