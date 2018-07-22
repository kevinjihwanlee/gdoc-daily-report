const Constants = {
    baseFolder: "daily_reports"
}

function createNewReport() {
    let previousReportId = []
    const baseFolders = DriveApp.getFoldersByName(Constants.baseFolder)
    while (baseFolders.hasNext()) { 
        const folder = baseFolders.next()
        const files = folder.getFiles()
        while (files.hasNext()) {
            previousReportId.push(files.next().getId())
        }
        let today = new Date()
        const dd = today.getDate()
        const mm = ('0' + (today.getMonth() + 1)).slice(-2)
        let newReportTitle = mm + "/" + dd + " Daily Report"
        DriveApp.getFileById(previousReportId[0]).makeCopy(newReportTitle, folder)
    }
}

function main() {
    createNewReport()
}
