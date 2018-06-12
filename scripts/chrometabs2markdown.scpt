(* Copy all open tabs from the Google Chrome windows that have focus
 *
 * @param targetWindow -- chrome window to copy tabs
 *
 * version: 0.2
 * author: Eloy Pineda <code@eloy.email>
 * license: MIT
 *)

on run (arg)
	set targetWindow to 1 -- default window is 1
	if arg's length is 1 then set targetWindow to arg's item 1 as number

	set urlList to {}
	tell application "Google Chrome"
		activate
		set chromeWindow to window targetWindow
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
end run
