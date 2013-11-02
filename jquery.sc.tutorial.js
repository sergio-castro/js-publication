(function ($) {
	
	/*
	Adapted from https://gist.github.com/duncansmart/5267653
	*/
	$.prettifyCodeSnippets = function(theme) {
		$('*[data-editor]').each(function () {
			var original_editor = $(this);
			original_editor.addClass('ace_editor'); //in order of this script to work, the original editor should use the same space than the ace editor.
			var original_text = original_editor.text();
			var mode = original_editor.data('editor');

			var editDiv = $('<div>', { //an ace editor must be explicitly sized and positioned absolute or relative for Ace to work (https://github.com/ajaxorg/ace).
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
			editor.setShowPrintMargin(false);
			editor.getSession().setValue(original_text);
			editor.getSession().setMode("ace/mode/" + mode);
			editor.setTheme("ace/theme/" + theme);
			if('true' != original_editor.attr('contenteditable'))
				editor.setReadOnly(true);
			else
				editor.setReadOnly(false);
		});
	}
	
	
	/*
	Core script adapted from http://ignorethecode.net/blog/2010/04/20/footnotes/
	css style adapted from http://www.leancrew.com/all-this/2010/05/popup-footnotes/
	*/
	$.configureFootnotes = function() {
		var Footnotes = {
		    footnotetimeout: false,
		    setup: function() {
		        var footnotelinks = $("a[rel='footnote']")

		        footnotelinks.unbind('mouseover',Footnotes.footnoteover);
		        footnotelinks.unbind('mouseout',Footnotes.footnoteoout);

		        footnotelinks.bind('mouseover',Footnotes.footnoteover);
		        footnotelinks.bind('mouseout',Footnotes.footnoteoout);
		    },
		    footnoteover: function() {
		        clearTimeout(Footnotes.footnotetimeout);
		        $('#footnotediv').stop();
		        $('#footnotediv').remove();

		        var id = $(this).attr('href').substr(1);
		        var position = $(this).offset();

		        var div = $(document.createElement('div'));
		        div.attr('id','footnotediv');
		        div.bind('mouseover',Footnotes.divover);
		        div.bind('mouseout',Footnotes.footnoteoout);

		        var el = document.getElementById(id);
		        div.html($(el).html());
		        /*
		        div.css({
		            position:'absolute',
		            width:'400px',
		            opacity:0.95
		        });
		*/
				div.css({
			        position:'absolute',
			/*
			        width:'400px',
			*/
			        background:'#ded',
			        padding:'0em 1em 0em 1em',
			        border:'solid 1px',
			        'font-size':'90%',
			        'font-family': 'Helvetica, Sans-serif',
			        'line-height':1.4,
			        '-moz-border-radius':'.5em',
			        '-webkit-border-radius':'.5em',
			        'border-radius':'.5em',
			        opacity:0.95
			    });


		        $(document.body).append(div);

		        var left = position.left;
		        if(left + 420  > $(window).width() + $(window).scrollLeft())
		            left = $(window).width() - 420 + $(window).scrollLeft();
		        var top = position.top+20;
		        if(top + div.height() > $(window).height() + $(window).scrollTop())
		            top = position.top - div.height() - 15;
		        div.css({
		            left:left,
		            top:top
		        });
		    },
		    footnoteoout: function() {
		        Footnotes.footnotetimeout = setTimeout(function() {
		            $('#footnotediv').animate({
		                opacity: 0
		            }, 600, function() {
		                $('#footnotediv').remove();
		            });
		        },100);
		    },
		    divover: function() {
		        clearTimeout(Footnotes.footnotetimeout);
		        $('#footnotediv').stop();
		        $('#footnotediv').css({
		                opacity: 0.9
		        });
		    }
		}
		Footnotes.setup();
	}
})(jQuery);
