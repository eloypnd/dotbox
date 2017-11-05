# Open source projects comparison

This is a Google Apps Script for Google Spreadsheet that fetch the data from Github API to get some basics statistics to compare different open source projects.

> Data fetched from Github API:
  - Link to Github and website.
  - Project description.
  - Project stars.
  - Open issues
  - Relevant dates: creation, last update and last pushed.
  - Open PRs

## Installation

As far as there is no simple way to push source code to Google Apps Script there is some manual process required:

#### Create Google Spreadsheet and Google Apps Script

1. Create a new Google Spreadsheet.
2. Go to top menu: `Tools > Script editor...`
3. Manually create the 4 files required for this project: `Code.gs`, `Github.gs`, `UI.gs`, `Util.gs`. And copy/paste the content for all of them.
> If you rather coping the content from the 4 files in one single `Code.gs` file that would work too.

#### Setup Github Oauth

1. We need to add an [Oauth2 library](https://github.com/googlesamples/apps-script-oauth2) to our Google Apps Script:

  - Go to `Resources > Libraries...`
  - Add [Oauth2 library](https://github.com/googlesamples/apps-script-oauth2) with project key: `1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF`. Select mos recent version.

2. We need a **redirect URI** from Google Apps Script to use later on Github Oauth configuration:

  - Go to: `File > Project properties`
  - Copy `Script ID`
  - Replace your `Script ID` in the following URI: `https://script.google.com/macros/d/{Script ID}/usercallback`. This is your **redirect URI**.

3. Then we need to publish the project to get the application’s URL (make the redirect URI publicly available, and reachable for Github Oauth service):

  - Go to `Publish > Deploy as web app…`
  - Follow the steps and in the last dialog copy the `Current web app URL`.

4. Now we move to [Github Developer Settings](https://github.com/settings/developers):

  - Click on [`New Oauth App`](https://github.com/settings/applications/new).
  - Fill in all the fields where:
    - `Homepage URL` is the `Current web app URL` from step 3.
    - `Authorization callback URL` is the `redirect URL` from step 2.
  - Click on `Register application`.
  - And get to application page where you can find the `Client ID` and `Client Secret`.

5. Go back to Google Apps Script to finish the Oauth process:

  - Go to: `File > Project properties`
  - Go to `Script properties` tab.
  - Click `+ Add row` to create the 3 following pairs:
    - ghApiUrl: https://api.github.com/
    - ghId: your `Client ID` from step 4
    - ghSecret: your `Client Secret` from step 4.
  - Open `Github.gs` file.
  - Go to `Run > Run function > getGitHubRateLimit`.
  - Go to `View > Logs`
  - Copy the authorization URL from the logs and paste it in a new tab in your web browser.
  - That should redirect you to Github authorization page.
  - Once you finish the authorization process on Github you should be redirected back to your google URL with the message: `Success! You can close this tab.`

If the process was done correctly you are authenticated now with Github API and you ca start fetching repositries data.

#### Add function trigger

We need to setup a trigger to run our `onEditCell` function each time a cell is edited on the Spreadsheet.

- Go to `Edit > Current project's triggers`
- Click on `Add a new trigger`
- In the 1st dropdown choose `onEditCell`
- In the 2nd dropdown choose `From Spreadsheet`
- In the 3rd dropdown choose `onEdit`
- Click `Save` and you are done :)

## Usage

Simply paste a Github HTTP URL in the first column of any row. Wait for the script to fetch the data and fill the rest of the columns.

You can add the following headers to your Spreadsheets for a better reading experience:

| A | B | C | D | E | F | G | H | I |
|--- |--- |--- |--- |--- |--- |--- |--- |--- |
| github | web | description | stars | issues | created | updated | last pushed | open PRs |

## License

MIT License: Copyright (c) 2017 Eloy Pineda

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## references

Documentation used to implement this script:

- [Google Developers - Apps Script Reference](https://developers.google.com/apps-script/reference/)
- [Show data from GitHub's API in Google Sheets, with Apps Script & Oauth](https://www.benlcollins.com/apps-script/oauth-github/)
- [apps_script_apis/Code.gs at master · benlcollins/apps_script_apis](https://github.com/benlcollins/apps_script_apis/blob/master/api_006_github_oauth/Code.gs)
- [Repositories | GitHub Developer Guide](https://developer.github.com/v3/repos/#get)
- [Pull Requests | GitHub Developer Guide](https://developer.github.com/v3/pulls/#list-pull-requests)
