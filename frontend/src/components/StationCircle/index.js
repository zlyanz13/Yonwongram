import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import line1 from 'images/MetroCircle/Seoul_Metro_Line_1.png';
import line2 from 'images/MetroCircle/Seoul_Metro_Line_2.png';
import line3 from 'images/MetroCircle/Seoul_Metro_Line_3.png';
import line4 from 'images/MetroCircle/Seoul_Metro_Line_4.png';
import line5 from 'images/MetroCircle/Seoul_Metro_Line_5.png';
import line6 from 'images/MetroCircle/Seoul_Metro_Line_6.png';
import line7 from 'images/MetroCircle/Seoul_Metro_Line_7.png';
import line8 from 'images/MetroCircle/Seoul_Metro_Line_8.png';
import line9 from 'images/MetroCircle/Seoul_Metro_Line_9.png';
import UK from 'images/MetroCircle/Seoul_Metro_Line_U_Line.png';
import BD from 'images/MetroCircle/Seoul_Metro_Line_Bundang.png';
import SBD from 'images/MetroCircle/Seoul_Metro_Line_Shinbundang.png';
import Suin from 'images/MetroCircle/Seoul_Metro_Line_Suin.png';
import arex from 'images/MetroCircle/Seoul_Metro_Line_Arex.png';
import GJ from 'images/MetroCircle/Seoul_Metro_Line_Gyeongui-Jungang.png';
import GC from 'images/MetroCircle/Seoul_Metro_Line_Gyeongchun.png';
import GG from 'images/MetroCircle/Seoul_Metro_Line_Gyeonggang.png';
import UI from 'images/MetroCircle/Seoul_Metro_Line_Ui.png';
import everline from 'images/MetroCircle/Seoul_Metro_EverLine.png';
import noPhoto from 'images/noPhoto.png';

const StationCircle = props => (
  <span>
    <img
      src={getCircle (props.line)}
      alt={props.line}
      className={
        props.big
          ? styles.bigcircle
          : props.middle ? styles.middlecircle : styles.smallcircle
      }
    />

  </span>
);

function getCircle (line) {
  switch (line) {
    case '1':
      return line1;
    case '2':
      return line2;
    case '3':
      return line3;
    case '4':
      return line4;
    case '5':
      return line5;
    case '6':
      return line6;
    case '7':
      return line7;
    case '8':
      return line8;
    case '9':
      return line9;

    case 'U':
      return UK;
    case '경강':
      return GG;
    case '경의중앙':
      return GJ;
    case '경춘선':
      return GC;
    case '공항철도':
      return arex;
    case '분당선':
      return BD;
    case '수인선':
      return Suin;
    case '신분당선':
      return SBD;
    case '용인경전철':
      return everline;
    case '우이신설':
      return UI;
    default:
      return noPhoto;
  }
}

StationCircle.propTypes = {
  line: PropTypes.string.isRequired,
  big: PropTypes.bool,
};

export default StationCircle;
