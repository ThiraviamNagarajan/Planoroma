import React from "react";
import MovieModal from "../Moviemodal";

const MovieDetails = ({ movie }: any) => {
  const [open, setOpen] = React.useState(false);
console.log(movie, "movie");

  function formatDateString(dateString: any) {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const [year, month, day] = dateString.split("-");
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = months[parseInt(month, 10) - 1];

    return `${formattedDay} ${formattedMonth} ${year}`;
  }

  return (
    <>
      <div
        style={{
          padding: "15px",
          color: "var(--primary-color)",
          backgroundColor: "var(--secondary-color)",
          borderRadius: "6px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          width: "27%",
          cursor: "pointer",
        }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div
          style={{
            width: "100%",
            height: "150px",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          <img src={movie.backdrop_path} width={"100%"} height={"100%"} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: "500", width: "75%" }}>
            {movie.original_title}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "10px",
              gap: "5px",
            }}
          >
            <div>Streamed on</div>
            <div style={{ color: "black" }}>
              {formatDateString(movie.first_aired)}
            </div>
          </div>
        </div>
      </div>
      <MovieModal open={open} setOpen={setOpen} data={movie} />
    </>
  );
};

export default MovieDetails;
