(* Copy all open tabs from the Google Chrome windows that have focus
 *
 * version: 0.1
 * author: Eloy Pineda <me@eloy.codes>
 * license: MIT
 *)

set urlList to {}
tell application "Google Chrome"
	activate
	set chromeWindow to front window
	repeat with w in chromeWindow
		try
			repeat with t in (tabs of w)
				set tabTitle to (title of t)
				set tabUrl to (URL of t)
				set tabLine to ("- [" & tabTitle & "](" & tabUrl & ")")
				copy tabLine to the end of urlList
			end repeat
		end try
	end repeat
end tell

set text item delimiters to linefeed
set the clipboard to urlList as text
return urlList as text
