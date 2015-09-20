var globalHelpers = {
  censorship: function (text, visible) {
	  if(visible)
		  return text;
	  else {
		var hiddenComment = '';
		for(var i = 0; i < text.length; i++)
			hiddenComment += '█'
	  }
	  return hiddenComment;
  },
}

module.exports = globalHelpers;
