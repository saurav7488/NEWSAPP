import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {  
    category: "general",
    pageSize: 8,
  };
  static propTypes = {
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.props.category}-WNN`;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
      this.props.category
    }&apiKey=d8ce7ba91b194304aad3534fa11db7ea&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parselData = await data.json();
    this.setState({
      articles: parselData.articles,
      totalResults: parselData.totalResults,
    });
    this.props.setProgress(100);
  }

  handleNext = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
        this.props.category
      }&apiKey=d8ce7ba91b194304aad3534fa11db7ea&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parselData = await data.json();
      console.log(parselData);
      this.setState({ loading: false });
      this.setState({
        articles: parselData.articles,
        page: this.state.page + 1,
      });
    }
  };
  handlePrev = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
      this.props.category
    }&apiKey=d8ce7ba91b194304aad3534fa11db7ea&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parselData = await data.json();
    console.log(parselData);
    this.setState({
      articles: parselData.articles,
      page: this.state.page - 1,
    });
  };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
      this.props.category
    }&apiKey=d8ce7ba91b194304aad3534fa11db7ea&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parselData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parselData.articles),
      totalResults: parselData.totalResults,
      loading:false,
    })
  };
  render() {
    return (
      <div className="container my-4">
        <h2 className="text-center">Top Headlines</h2>
        {/* {this.state.loading && <Spinner/>}*/}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((ele) => {
                return (
                  <div className="col-md-4" key={ele.url}>
                    <NewsItem
                      title={ele.title ? ele.title.slice(0, 40) : ""}
                      description={
                        ele.description ? ele.description.slice(0, 88) : ""
                      }
                      imageurl={ele.urlToImage ? ele.urlToImage : ""}
                      newsurl={ele.url ? ele.url : ""}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
