const Constants = {
    baseFolder: "daily_reports",
    oldFolder: "old_reports"
}

function createDailyTrigger() {
    ScriptApp.newTrigger('createNewReport')
        .timeBased()
        .onWeekDay(ScriptApp.WeekDay.MONDAY)
        .onWeekDay(ScriptApp.WeekDay.TUESDAY)
        .onWeekDay(ScriptApp.WeekDay.WEDNESDAY)
        .onWeekDay(ScriptApp.WeekDay.THURSDAY)
        .onWeekDay(ScriptApp.WeekDay.FRIDAY)
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
        const dd = today.getDate()
        const mm = ('0' + (today.getMonth() + 1)).slice(-2)
        let newReportTitle = mm + "/" + dd + " Daily Report"
        report.makeCopy(newReportTitle, folder)
        folder.removeFile(report)
    }
}

function main() {
    createNewReport()
}
