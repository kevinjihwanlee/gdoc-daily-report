const Constants = {
    baseFolder: "daily_reports",
    oldFolder: "old_reports"
}

function createDailyTrigger() {
    ScriptApp.newTrigger('main')
        .timeBased()
        .everyDays(1)
        .atHour(8)
        .create()
}

function createNewReport() {
    let previousReportId = []
    const baseFolders = DriveApp.getFoldersByName(Constants.baseFolder)
    const oldFolder = DriveApp.getFoldersByName(Constants.oldFolder)
    while (baseFolders.hasNext()) { 
        const folder = baseFolders.next()
        const old = oldFolder.next()
        const files = folder.getFiles()
        while (files.hasNext()) {
            previousReportId.push(files.next().getId())
        }
        const report = DriveApp.getFileById(previousReportId[0])
        old.addFile(report)
        let today = new Date()
        const dd = ('0' + String(today.getDate()).slice(-2))
        const mm = ('0' + (today.getMonth() + 1)).slice(-2)
        let newReportTitle = mm + "/" + dd + " Daily Report"
        report.makeCopy(newReportTitle, folder)
        folder.removeFile(report)
    }
}

function main() {
  const today = new Date().getDay()
  if (!(today === 0 || today === 6)) {
    createNewReport()
  }
}
