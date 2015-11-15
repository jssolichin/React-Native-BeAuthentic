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
  shorten: function (text, length){
	  return (text.length > length) ? text.substring(0, length-3) + '...' :  text;
  }
}

module.exports = globalHelpers;
