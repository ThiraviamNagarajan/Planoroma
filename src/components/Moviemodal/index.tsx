import { Box, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "55%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "70vh",
  bgcolor: "var(--tertiary-color)",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  "&:focus": {
    outline: "none"
  }
};

export default function MovieModal({
  open,
  setOpen,
  data
}: {
  open: boolean;
  setOpen: any;
  data: any;
}) {
  const handleClose = () => setOpen(false);

  function formatDateString(dateString: any) {
    const months = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
    const [year, month, day] = dateString.split("-");
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = months[parseInt(month, 10) - 1];
    return `${formattedDay} ${formattedMonth} ${year}`;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <img
          src={data?.backdrop_path}
          style={{ width: "100%", height: "200px", borderRadius: "4px" }}
        />
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          color="#ffffff"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#ffffff",
              marginTop: "10px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <div>{data?.original_title}</div>
              <div style={{display:'flex', gap:'5px', flexWrap: 'wrap'}}>
                {data?.genres.length > 0 &&
                  data.genres.map((val: any, index: any) => (
                    <div
                      key={index}
                      style={{
                        fontSize: "10px",
                        color: "white",
                        backgroundColor: "gray",
                        padding: "4px 12px",
                        borderRadius: "12px",
                        display: "inline-block",
                        textAlign: "center",
                        margin: "5px 0",
                        width:'fit-content'
                      }}
                    >
                      {val}
                    </div>
                  ))}
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <div style={{ fontSize: "16px" }}>Released on</div>
              <div style={{ fontSize: "14px" }}>
                {formatDateString(data?.first_aired)}
              </div>
            </div>
          </div>
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, color: "#ffffff" }}
        >
          {data?.overview}
        </Typography>
      </Box>
    </Modal>
  );
}