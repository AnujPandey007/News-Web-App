import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';

export default class News extends Component {

  static defaultProps = {
    country: 'in',
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  }

  constructor(props){
    super(props);
    document.title= "Janatig News - " +(this.props.category==="general" ? "Home" :(this.props.category[0].toUpperCase() + this.props.category.slice(1).toLowerCase()));
    this.state = {
      items: [],
      page: 1,
      maxPages: 1,
      isLoaded: false
    };
  }

  async componentDidMount() {
      let newsApiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=10&page=${this.state.page}`;

      let newsData = await fetch(newsApiUrl);
      let jsonNewsData = await newsData.json();

      this.setState({
        items: jsonNewsData["articles"],
        page:1,
        maxPages: Math.ceil(jsonNewsData["totalResults"]/10),
        isLoaded: true
      });
    }

    handlePrevPages= async()=>{

      this.setState({
        isLoaded: false
      });

      let newsApiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=10&page=${this.state.page-1}`;

      let newsData = await fetch(newsApiUrl);
      let jsonNewsData = await newsData.json();

      this.setState({
        items: jsonNewsData["articles"],
        page: this.state.page-1,
        maxPages: Math.ceil(jsonNewsData["totalResults"]/10),
        isLoaded: true
      });
    }

    handleNextPages= async()=>{
      
      this.setState({
        isLoaded: false
      });

      let newsApiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=10&page=${this.state.page+1}`;

      let newsData = await fetch(newsApiUrl);
      let jsonNewsData = await newsData.json();

      this.setState({
        items: jsonNewsData["articles"],
        page: this.state.page+1,
        maxPages: Math.ceil(jsonNewsData["totalResults"]/10),
        isLoaded: true
      });
    }

  render() {

    if (!this.state.isLoaded) 
      return (<div className='text-center'>
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
      );

    return (
        <div className='container my-3'>
          <h2 className='text-center' style={{margin: "80px 40px"}}>Top {(this.props.category[0].toUpperCase() + this.props.category.slice(1).toLowerCase())} Headlines</h2>
          <div className="row">
            {this.state.items.map((item)=>{
              return (<div className="col-md-4" key={item.url}>
                      <NewsItem author={item.author??"Unknown"} source={item.source.name??"Unknown"} date={item.publishedAt??"NA"} title={item.title??"Unknown"} description={item.description??"Unknown"} imageUrl={item.urlToImage??"https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} newsUrl={item.url??""}/>
                    </div>);
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1 ? true : false} type="button" class="btn btn-primary" onClick={this.handlePrevPages}>&larr; Previous</button>
            <button disabled={this.state.page>=this.state.maxPages ? true : false} type="button" class="btn btn-primary" onClick={this.handleNextPages}>Next &rarr;</button>
          </div>
        </div>
    )
  }
}
