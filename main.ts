const Constants = {
    baseFolder: "daily_reports"
}

// interface Document {
//     id: string
//     content: string
// }

function getPreviousReport() {
    let previousReport
    const baseFolders = DriveApp.getFoldersByName(Constants.baseFolder)
    while (baseFolders.hasNext()) { 
        const files = baseFolders.next().getFiles()
        while (files.hasNext()) {
            previousReport = files.next().getId()
        }
    }
    return previousReport
}

function main() {
    let previousReportId = getPreviousReport()
    Logger.log(DocumentApp.openById(previousReportId).getBody())
}
