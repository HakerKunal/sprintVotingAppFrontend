import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const VoteTable = ({ resultData, specialMention }) => {
  let listOfVoteBy = [];

  const sortedData =
    resultData !== 0
      ? [...resultData?.vote_details].sort((a, b) =>
          a.vote_by.localeCompare(b.vote_by)
        )
      : [];

  if (sortedData.lenght === 0) {
    return <p>Not Voted Till Now</p>;
  }

  return (
    <>
      <table>
        <thead>
          <tr
            colSpan={4}
            style={{
              width: "69vw",
              backgroundColor: "black",
              color: "white",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              fontSize: "18px",
            }}
          >
            Vote Details
          </tr>

          <tr>
            <th>S.No.</th>
            <th>Vote By</th>
            <th>Vote To</th>
            <th>Parameter Name</th>
          </tr>
        </thead>
        <tbody>
          {sortedData?.map((vote, index) => {
            const isLastEntry = index === sortedData.length - 1;
            const showSpecialMentions =
              isLastEntry || vote.vote_by !== sortedData[index + 1].vote_by;
            const specialMentionObj = specialMention.find(
              (mention) =>
                mention?.vote_by?.toLowerCase() === vote?.vote_by?.toLowerCase()
            );

            return (
              <React.Fragment key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{vote.vote_by}</td>
                  <td>{vote.vote_to}</td>
                  <td>{vote.parameter_name}</td>
                </tr>
                {showSpecialMentions && specialMentionObj && (
                  <tr>
                    <td colSpan="4">
                      <SpecialMentions
                        mentions={specialMentionObj.special_mentions}
                      />
                    </td>
                  </tr>
                )}
                {!isLastEntry &&
                  vote.vote_by !== sortedData[index + 1].vote_by && (
                    <div class="blank_row" style={{ bottom: 1 }}></div>
                  )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default VoteTable;
const SpecialMentions = ({ mentions }) => {
  return (
    <Accordion
      sx={{ position: "relative", top: 5 }}
      className="accordian_row"
      fullWidth
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Honourable Mention</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <span
          style={{
            border: "1px solid rgba(0,0,0,0.25)",
            padding: "20px 10px ",
            borderRadius: 7,
            display: "block",
            whiteSpace: "pre",
            textAlign: "left",
          }}
        >
          {mentions}
        </span>
      </AccordionDetails>
    </Accordion>
  );
};
