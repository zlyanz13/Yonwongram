import React from 'react'
import styles from './styles.scss'
import PropTypes from 'prop-types'

const Footer = (props, context) => (
  <footer className={styles.footer}>
    <div className={styles.column}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.listItem}>{context.t('About Us')}</li>
          <li className={styles.listItem}>{context.t('Support')}</li>
          <li className={styles.listItem}>{context.t('Blog')}</li>
          <li className={styles.listItem}>{context.t('Press')}</li>
          <li className={styles.listItem}>{context.t('API')}</li>
          <li className={styles.listItem}>{context.t('JOBS')}</li>
          <li className={styles.listItem}>{context.t('PRIVACY')}</li>
          <li className={styles.listItem}>{context.t('DIRECTORY')}</li>
          <li className={styles.listItem}>{context.t('Language')}</li>
        </ul>
      </nav>
    </div>
    <div className={styles.column}>
      <span className={styles.copyright}>
        © 2018 Sinsigaji
      </span>
    </div>
  </footer>
)

Footer.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Footer

/*
// State Components

class Footer extends React.Component{
  static contextTypes={
    t: PropTypes.func.isRequired
  }
  render(){
    return(
        <footer className={styles.footer}>
    <div className={styles.column}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.listItem}>{this.context.t("About Us")}</li>
          <li className={styles.listItem}>Support</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Press</li>
          <li className={styles.listItem}>API</li>
          <li className={styles.listItem}>Jobs</li>
          <li className={styles.listItem}>Privacy</li>
          <li className={styles.listItem}>Directory</li>
          <li className={styles.listItem}>Language</li>
        </ul>
      </nav>
    </div>
    <div className={styles.column}>
      <span className={styles.copyright}>
        © 2018 Sinsigaji
      </span>
    </div>
  </footer>
    )
  }
}
*/
