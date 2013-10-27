(function ($) {
	
	$.prettifyCodeSnippets = function(theme) {
		$('*[data-editor]').each(function () {
			var original_editor = $(this);
			var original_text = original_editor.html();
			var mode = original_editor.data('editor');

			var editDiv = $('<div>', {
				position: 'absolute',
				width: original_editor.width(),
				height: original_editor.height(),
				'class': original_editor.attr('class')
				}).insertBefore(original_editor);
			//original_editor.css('visibility', 'hidden'); //an invisible element still uses space.
			original_editor.hide(); //equivalent to .css( "display", "none" ), the hidden element does not use space.
			var editor = ace.edit(editDiv[0]);
			if(false == original_editor.data('show-gutter'))
				editor.renderer.setShowGutter(false);
			else
				editor.renderer.setShowGutter(true);
			editor.setHighlightActiveLine(false);
			editor.getSession().setValue(original_text);
			editor.getSession().setMode("ace/mode/" + mode);
			editor.setTheme("ace/theme/" + theme);
			if('true' != original_editor.attr('contenteditable'))
				editor.setReadOnly(true);
			else
				editor.setReadOnly(false);
		});
	}
	
})(jQuery);
