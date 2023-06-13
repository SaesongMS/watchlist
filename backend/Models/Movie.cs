using MongoDB.Bson;

namespace Project_WebAPI.Models
{
    public class MovieRoot
    {
        public int page { get; set; }
        public string next { get; set; }
        public int entries { get; set; }
        public List<Movie> results { get; set; }
    }
    public class Movie
    {
        //public ObjectId _id { get; set; }
        public string id { get; set; }
        public MovieRatingSummary ratingSummary { get; set; }
        Nullable<int> episodes { get; set; }
        public MoviePrimaryImage primaryImage { get; set; }
        public MovieTitleType titleType { get; set; }
        public MovieGenres genres { get; set; }
        public MovieTitleText titleText { get; set; }
        public MovieTitleText originalTitleText { get; set; }
        public MovieReleaseYear releaseYear { get; set; }
        public MovieReleaseDate releaseDate { get; set; }
        public MovieRuntime runtime { get; set; }
        public string series { get; set; }
        public MovieMeterRanking meterRanking { get; set; }
        public MoviePlot plot { get; set; }
        public Nullable<int> position { get; set; }

    }

    public class MovieRatingSummary
    {
        public double aggregateRating { get; set; }
        public int voteCount { get; set; }
        public string __typename { get; set; }
    }

    public class MoviePrimaryImage
    {
        public string id { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public string url { get; set; }
        public MoviePrimaryImageCaption caption { get; set; }
        public string __typename { get; set; }
    }

    public class MoviePrimaryImageCaption
    {
        public string plainText { get; set; }
        public string __typename { get; set; }
    }

    public class MovieTitleType
    {
        public string text { get; set; }
        public string id { get; set; }
        public bool isSeries { get; set; }
        public bool isEpisode { get; set; }
        public string __typename { get; set; }
    }

    public class MovieGenres
    {
        public List<MovieGenresItem> genres { get; set; }
        public string __typename { get; set; }
    }

    public class MovieGenresItem
    {
        public string text { get; set; }
        public string id { get; set; }
        public string __typename { get; set; }
    }

    public class MovieTitleText
    {
        public string text { get; set; }
        public string __typename { get; set; }
    }

    public class MovieReleaseYear
    {
        public int year { get; set; }
        Nullable<int> endYear { get; set; }
        public string __typename { get; set; }

    }

    public class MovieReleaseDate
    {
        Nullable<int> day { get; set; }
        Nullable<int> month { get; set; }
        public int year { get; set; }
        public string __typename { get; set; }
    }

    public class MovieRuntime
    {
        public int seconds { get; set; }
        public string __typename { get; set; }
    }

    public class MovieMeterRanking
    {
        public int currentRank { get; set; }
        public MeterRankingRankChange rankChange { get; set; }
        public string __typename { get; set; }
    }

    public class MeterRankingRankChange
    {
        public string changeDirection { get; set; }
        public int difference { get; set; }
        public string __typename { get; set; }
    }

    public class MoviePlot
    {
        public MoviePlotText plotText { get; set; }
        public MoviePlotLanguage language { get; set; }
        public string __typename { get; set; }
    }

    public class MoviePlotText
    {
        public string plainText { get; set; }
        public string __typename { get; set; }
    }

    public class MoviePlotLanguage
    {
        public string id { get; set; }
        public string __typename { get; set; }
    }
}
