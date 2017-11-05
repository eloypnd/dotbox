/* eslint-disable */

function onEditCell (e) {
  var rangeA1Notation = e.range.getA1Notation();
  var value = e.value;
  // if cell is in first column
  if (/^A\d*$/.test(rangeA1Notation)) {
    var row = rangeA1Notation.substr(1);
    Logger.log(prettyPrint(e, 'Edited row: ' + row))
    var repo = /^https?:\/\/github\.com\/(\S*)\/(\S*)\/?$/.exec(value);

    if (repo.length === 3) {
      Logger.log('Value is valid Github repository URL.');
      var range = 'A' + row + ':H' + row;
      var repoData = getRepository(repo[1], repo[2]);
      Logger.log(prettyPrint(repoData, 'repoData'));
      var values = [[
        '=HYPERLINK("' + repoData.html_url + '","' + repoData.full_name + '")',
        !!repoData.homepage
          ? '=HYPERLINK("' + repoData.homepage + '","web")'
          : '-',
        repoData.description,
        repoData.stargazers_count,
        repoData.open_issues,
        new Date(repoData.created_at).toDateString(),
        new Date(repoData.updated_at).toDateString(),
        new Date(repoData.pushed_at).toDateString()
      ]]
      Logger.log(prettyPrint(values, 'values to insert in range ' + range));
      SpreadsheetApp.getActiveSpreadsheet()
        .getActiveSheet()
        .getRange(range)
        .setValues(values);
      var pullRequests = getPullRequests(repo[1], repo[2]);
      SpreadsheetApp.getActiveSpreadsheet()
        .getActiveSheet()
        .getRange('I' + row)
        .setValue(pullRequests.length);
    }
  }
}

// add custom menu
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('GitHub')
      .addItem('Refresh','refreshReposStats')
      .addItem('Get rate quota','getGitHubRateLimit')
      .addToUi();
}

function refreshReposStats () {
  showDialog('Refresh repository stats is not implemented.');
}
