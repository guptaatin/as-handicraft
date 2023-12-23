import React, { Component } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import ReactSlick from 'react-slick';
import './react-slick.css';

/* --------------component ReactSlickExample Starts-------------- */

export default class ReactSlickExample extends Component {
    render() {
        const {
            rimProps,
            rsProps,
            data
        } = this.props;
        data?.image.map(obj => {
            obj.src = `data:image/png;base64,${Buffer.from(obj.data).toString('base64')}`;
            obj.setting = '500w';
        });
        return (
            <ReactSlick
                {...{
                    dots: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }}
                {...rsProps}
            >
                {data?.image.map((src, index) => (
                    <div key={index}>
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: 'Wristwatch by Versace',
                                    isFluidWidth: true,
                                    src: src.src,
                                    sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                                },
                                largeImage: {
                                    alt: 'Large img',
                                    src: src.src,
                                    width: 800,
                                    height: 800
                                },
                                shouldUsePositiveSpaceLens: true,
                                lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
                            }}
                            {...rimProps}
                        />
                    </div>
                ))}
            </ReactSlick>
        );
    }
}
/* --------------component ReactSlickExample Ends-------------- */