import React from 'react'
import SVG from '../modal/SVG.tsx'

export default function Footer() {

    return (
        <footer>
            <section className='footer-section'>
                <div className='footer-left'>
                    <div className='footer-title'>
                    <span>Dilettante</span>
                    </div>
                    <div className='footer-item'>
                        <a href='https://cafe.naver.com/purples6bha' target='_blank'><SVG name='cafe' width={32} height={32} color='#ffffff' /></a>
                        <a href='https://blog.naver.com/dltt_music' target='_blank'><SVG name='blog' width={32} height={32} color='#ffffff' /></a>
                        <a href='http://www.dlttmusic.com/' target='_blank'><SVG name='homepage' width={32} height={32} color='#ffffff' /></a>
                        <a href='https://www.instagram.com/dilettantepiano/' target='_blank'><SVG name='insta_logo' width={32} height={32} color='#ffffff' /></a>
                    </div>
                </div>
                <div className='footer-right'>
                    <div className='footer-item'>
                        <span>경기 수원시 영통구 영통로217번길 21</span>
                    </div>
                    <div className='footer-item'>
                        Tel: 010-8800-4825
                    </div>
                    <div className='footer-item'>
                        Copyrights oogie826
                    </div>
                </div>
            </section>
        </footer>
    )
}