# CSS布局
1.两列左侧定宽右侧自适应布局
HTML结构
```html
	<div class="box">
		<div class="left">
			<h4>左侧定宽</h4>
		</div>
		<div class="right">
			<div class="right_content">
				<h4>右侧自适应</h4>
			</div>
		</div>
	</div>
```
CSS设置要点
- 左侧定宽部分左浮动`float:left`
- 右侧自适应部分设置`display:inline-block`或者设置`float:right`(此时需要父元素清浮动以正确设置父元素的高度)
- 右侧自适应部分设置margin-left负值(该值为左侧定宽值),内容content部分设置margin-left正值（该值为左侧定宽值加上左侧和右侧的间距值）
- 为什么要设置margin负值然后又设置正值？答：为了将定宽部分和自适应部分都包含在父元素中，防止溢出，如果父元素设置了溢出隐藏，那么很可能会将一部分原本可见的内容给隐藏掉

2.