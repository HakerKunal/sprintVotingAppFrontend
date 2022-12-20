import React from "react";
import * as XLSX from "xlsx";
import XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

const ExportExcelButton = ({ sprintObj, resultData }) => {
  const hanldeExportExcel = () => {
    handleExport().then((url) => {
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute(
        "download",
        `vote_result_${sprintObj.sprint_name}.xlsx`
      );
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);

    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i);
    }
    return buf;
  };
  const workbook2Blob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      type: "binary",
    };
    const wbout = XLSX.write(workbook, wopts);

    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });
    return blob;
  };

  const handleExport = () => {
    const title = [{ A: "Votes Details" }, {}];

    let table1 = [{ A: "S.No.", B: "Name", C: "Votes" }];
    let table2 = [
      {
        A: "Winner",
        B: "First runner up",
        C: "Second runner up",
      },
    ];
    let table3 = [{ A: "S.No.", B: "Vote to", C: "Vote by", D: "Parameter" }];
    let table4 = [{ A: "Sprint Name", B: "Start Date", C: "End Date" }];
    let resultList = [];
    resultList.push({
      vote_count: resultData.vote_count,
      winner: resultData.winner,
      first_runner_up: resultData.first_runner_up,
      second_runner_up: resultData.second_runner_up,
      vote_details: resultData.vote_details,
    });
    resultList.forEach((row) => {
      const voteCount = row.vote_count;
      const winner = row.winner;
      const firstRunner = row.first_runner_up;
      const secondRunner = row.second_runner_up;
      const voteDetails = row.vote_details;
      voteCount.forEach((v, index) => {
        table1.push({
          A: index + 1,
          B: v.label,
          C: v.y,
        });
      });
      let voteWinnerList = [];
      for (
        let i = 0;
        i <= winner.length ||
        i <= firstRunner.length ||
        i <= secondRunner.length;
        i++
      ) {
        let obj = {
          winner: winner[i] || null,
          firstRunner: firstRunner[i] || null,
          secondRunner: secondRunner[i] || null,
        };
        voteWinnerList.push(obj);
      }
      voteWinnerList.forEach((v) => {
        table2.push({
          A: v.winner,
          B: v.firstRunner,
          C: v.secondRunner,
        });
      });

      voteDetails.forEach((v, index) => {
        table3.push({
          A: index + 1,
          B: v.vote_to,
          C: v.vote_by,
          D: v.parameter_name,
        });
      });
    });
    table4.push({
      A: sprintObj.sprint_name,
      B: sprintObj.start_date,
      C: sprintObj.end_date,
    });
    table1 = title

      .concat([""])
      .concat([""])
      .concat({ A: "Sprint Details" })
      .concat(table4)
      .concat([""])
      .concat([""])
      .concat([{ A: "Winners List" }])
      .concat(table2)
      .concat([""])
      .concat([{ A: "Vote Counts" }])
      .concat(table1)

      .concat([""])
      .concat([""])
      .concat([{ A: "Vote Details" }])
      .concat(table3);
    const finalData = [...table1];

    const wb = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(finalData, { skipHeader: true });
    XLSX.utils.book_append_sheet(wb, sheet, "vote_details");
    const workbookBob = workbook2Blob(wb);

    const headerIndexes = [];
    finalData.forEach((data, index) =>
      data["A"] === "Sprint Details" ||
      data["A"] === "Sprint Name" ||
      data["A"] === "Vote Counts" ||
      data["A"] === "S.No." ||
      data["A"] === "Winners List" ||
      data["A"] === "Winner" ||
      data["A"] === "Vote Details"
        ? //   data["A"] === "Vote Details" ||

          headerIndexes.push(index)
        : null
    );
    const dataInfo = {
      titleCell: "A2",
      titleRange: "A1:D2",

      tbodyRange: `A3:H${finalData.length}`,
      theadRange1:
        headerIndexes.length >= 0
          ? `A${headerIndexes[0] + 1}:C${headerIndexes[0] + 1}`
          : null,

      theadRange:
        headerIndexes.length >= 1
          ? `A${headerIndexes[1] + 1}:C${headerIndexes[1] + 1}`
          : null,
      theadRange2:
        headerIndexes.length >= 2
          ? `A${headerIndexes[2] + 1}:C${headerIndexes[2] + 1}`
          : null,
      theadRange3:
        headerIndexes.length >= 3
          ? `A${headerIndexes[3] + 1}:C${headerIndexes[3] + 1}`
          : null,
      theadRange4:
        headerIndexes.length >= 4
          ? `A${headerIndexes[4] + 1}:C${headerIndexes[4] + 1}`
          : null,
      theadRange5:
        headerIndexes.length >= 5
          ? `A${headerIndexes[5] + 1}:C${headerIndexes[5] + 1}`
          : null,
      theadRange6:
        headerIndexes.length >= 6
          ? `A${headerIndexes[6] + 1}:D${headerIndexes[6] + 1}`
          : null,
      theadRange7:
        headerIndexes.length >= 7
          ? `A${headerIndexes[7] + 1}:D${headerIndexes[7] + 1}`
          : null,
    };
    return addStyles(workbookBob, dataInfo);
  };
  const addStyles = (workbookBlob, dataInfo) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
      workbook.sheets().forEach((sheet) => {
        sheet.column("A").width(20);
        sheet.column("B").width(15);
        sheet.column("C").width(20);
        sheet.column("D").width(15);

        sheet.range(dataInfo.titleRange).merged(true).style({
          bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });
        sheet.range(dataInfo.tbodyRange).style({
          horizontalAlignment: "center",
        });
        sheet.range(dataInfo.theadRange).style({
          fill: "808080",
          bold: true,
          fontColor: "ffffff",
        });
        sheet.range(dataInfo.theadRange1).merged(true).style({
          bold: true,
        });
        sheet.range(dataInfo.theadRange2).merged(true).style({
          bold: true,
        });
        sheet.range(dataInfo.theadRange3).style({
          fill: "808080",
          bold: true,
          fontColor: "ffffff",
        });
        sheet.range(dataInfo.theadRange4).merged(true).style({
          bold: true,
        });
        sheet.range(dataInfo.theadRange5).style({
          fill: "808080",
          bold: true,
          fontColor: "ffffff",
        });
        sheet.range(dataInfo.theadRange6).merged(true).style({
          bold: true,
        });
        sheet.range(dataInfo.theadRange7).style({
          fill: "808080",
          bold: true,
          fontColor: "ffffff",
        });
      });
      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };
  return (
    <button
      className="subheader--button"
      style={{
        width: "300px",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius:30,
        borderBottomRightRadius:30,
        margin: 0,
      }}
      onClick={hanldeExportExcel}
    >
      Download Excel
    </button>
  );
};
export default ExportExcelButton;
