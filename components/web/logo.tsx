import Image from 'next/image';
import React from 'react';

import logo from '../../public/logo.png';

const Logo = () => {
    return <Image
                  className="dark:invert"
                  src={logo}
                  alt="Next.js logo"
                  width={100}
                  height={20}
                  priority
                />
    
}

export default Logo;
