import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const VoteTable = ({ resultData, specialMention }) => {
  let listOfVoteBy = [];
  return (
    <>
      <table>
        <div
          style={{
            width: "69vw",
            backgroundColor: "black",
            color: "white",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px 10px 10px 10px",
            fontSize: "18px",
          }}
        >
          Vote Details
        </div>
        <tr>
          <th>S.No.</th>
          <th>Vote By</th>
          <th>Vote To</th>
          <th>Parameter</th>
        </tr>
        {resultData ? (
          resultData.vote_details
            .sort((a, b) => a.vote_by.localeCompare(b.vote_by))
            .map((val, key) => {
              let changed = true;
              let changed2 = false;

              if (!listOfVoteBy.includes(val.vote_by.toLowerCase())) {
                listOfVoteBy.push(val.vote_by.toLowerCase());
                if (listOfVoteBy.length > 1) {
                  changed = false;
                  changed2 = false;
                }
              } else {
                listOfVoteBy.push(val.vote_by.toLowerCase());
                changed = true;
                changed2 = true;
              }

              return (
                <>
                  {changed ? (
                    <></>
                  ) : (
                    <>
                      <div class="blank_row" style={{ bottom: 1 }}></div>
                    </>
                  )}
                  {changed2 ? (
                    <></>
                  ) : (
                    specialMention.map((mention) => {
                      if (
                        val.vote_by.toLowerCase() ===
                        mention.vote_by.toLowerCase()
                      ) {
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
                                }}
                              >
                                {mention.special_mentions}
                              </span>
                            </AccordionDetails>
                          </Accordion>
                        );
                      }
                    })
                  )}
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{val.vote_by}</td>
                    <td>{val.vote_to}</td>
                    <td>{val.parameter_name}</td>
                  </tr>
                </>
              );
            })
        ) : (
          <p>Not Voted Till Now</p>
        )}
      </table>
    </>
  );
};
export default VoteTable;
