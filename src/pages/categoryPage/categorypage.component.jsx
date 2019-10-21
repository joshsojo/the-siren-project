import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import { Row, Col } from "antd";
import WithSpinner from "../../components/witth-spinner/with-spinner.component";

import SingleHeadline from "../../components/single-headline/single-headline.component";

import "antd/dist/antd.css";
import "../../components/top-headlines/top-headlines.styles.scss";
import "./categorypage.styles.scss";

const CategoryPage = ({ match }) => (
  <div className="category-page">
    <Row gutter={[8, 16]}>
      <h2 className="short--underline">{match.params.category}</h2>
      <div className="top-headlines-section__body">
        {/* <Row gutter={[8, 16]} className="top-headlines-section__body--row">
          {category.headlines
            .filter((item, idx) => idx < 3)
            .map((headline, index) => (
          <SingleHeadline
                category={category.category}
                title={headline.title}
                description={headline.description}
                source={headline.source}
                publishedAt={headline.publishedAt}
              />
          ))}
        </Row> */}
      </div>
    </Row>
  </div>
);

export default withRouter(CategoryPage);
