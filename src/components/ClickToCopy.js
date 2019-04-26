import React from 'react';
import useCarabiner from 'react-carabiner';
import FadeIn from 'react-fade-in';

function ClickToCopy(props) {
  const [clipboard, updateClipboard] = useCarabiner();

  return (
    <div
      className='clickToCopy'
      onClick={
        () => {
          updateClipboard(props.imgurUrl);
          console.log(`Current clipboard content: ${clipboard}`);
          props.handleCopy();
        }
      }
    >
      <span>
        <p>{props.imgurUrl}</p>
        {props.copied ?
          <FadeIn>
            <p className="message">copied!</p>
          </FadeIn>
          :
          <FadeIn>
            <p className="message">click anywhere to copy this link to your clipboard</p>
          </FadeIn>
        }
      </span>
    </div>
  );
}

export default ClickToCopy;
