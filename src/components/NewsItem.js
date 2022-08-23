import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {

    return (
      <div className='my-3'>
        <div className="card" >
          <img src={this.props.imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{this.props.title} <span class="badge text-bg-success">{this.props.source}</span></h5>
            <p className="card-text">{this.props.description}</p>
            <p class="card-text"><small class="text-muted">By {this.props.author}, {new Date(this.props.date).toGMTString()}</small></p>
            <a href={this.props.newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
