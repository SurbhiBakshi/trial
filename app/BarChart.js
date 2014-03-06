function BarChart(div, years)
{
	var _div = div;
	var _years = years;
	build();
	
	function build()
	{
		var ul = $("<ul></ul>");
		var li;
		var labelDiv;
		var barCanvas;
		var bar;
		$.each(_years, function(index, value){
			labelDiv = $("<div>"+value+"</div>");
			$(labelDiv).addClass("barChart labelDiv");
			barCanvas = $("<div class='barCanvas'></div>");
			bar = $("<div class='bar'></div>");
			$(barCanvas).append(bar);
			li = $("<li></li>");
			$(li).append(labelDiv).append(barCanvas);
			$(ul).append(li);
		});
		$(_div).append(ul);
	}
	
	this.resize = function()
	{
		$(_div).height($(_div).parent().height() - 160);
		$(".barChart ul").height($(_div).innerHeight());
		$(".barChart li").height(parseInt($(".barChart ul").innerHeight() / $(".barChart li").length));
		$(".barChart .barCanvas").width($(".barChart li").width() - $(".barChart .labelDiv").width());
		$(".barChart .bar").height($(".barChart .barCanvas").height() - 4);
		$(".barChart .bar").css("top", 2);
	}
	
	this.setValues = function(hash) 
	{
		var maxCount = Math.max.apply(Math, $.map(hash, function(element,index){return element}));
		var pct;
		var val;
		$.each($(".barChart li"), function(index, value) {
			val = hash[$(value).find(".labelDiv").html()];
			if (!val) val = 0;
			pct = val / maxCount;
			pct = (pct * 100)+"%";
			$(value).find(".bar").animate({width: pct});
		});
	}
	
	this.getSelectedYear = function()
	{
	}
	
}