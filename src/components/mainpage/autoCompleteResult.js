import React from 'react';
import PropTypes from 'prop-types';


const AutoCompleteResult = ({
  results,
  userInput,
  handleClickItem
}) => {
  return (
    <React.Fragment>
      {results.slice(0, 5).map(result => (
        <div
          key={result.ticker}
          className="auto-complete-item"
          onClick={() => handleClickItem(result.ticker)}
        >
          <div>
            {result.ticker.slice(0, userInput.length).toUpperCase() === userInput.toUpperCase() ?
              <React.Fragment>
                <span className="match-words">{result.ticker.slice(0, userInput.length)}</span>
                <span>{result.ticker.slice(userInput.length)}</span>
              </React.Fragment> : (
                <span>{result.ticker}</span>
              )}
          </div>
          <div>
            {result.name.slice(0, userInput.length).toUpperCase() === userInput.toUpperCase() ?
              <React.Fragment>
                <span className="match-words">{result.name.slice(0, userInput.length)}</span>
                <span>{result.name.slice(userInput.length)}</span>
              </React.Fragment> : (
                <span>{result.name}</span>
              )}
          </div>
          <div className="auto-complete-item__exchange">{result.exchange}</div>
        </div>
      ))}
    </React.Fragment>
  )
}

AutoCompleteResult.propTypes = {

}

export default AutoCompleteResult;
