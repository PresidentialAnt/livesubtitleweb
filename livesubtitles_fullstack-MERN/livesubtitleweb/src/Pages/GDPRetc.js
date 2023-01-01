import React from 'react'
import {useState} from 'react'
const GDPRetc = ({onClick}) => {
  const onSubmit =(e)=>{
    e.preventDefault()
    onClick(e)
  }
  return (
    <section className='gdpr_section'>
      <form className='input--box' onSubmit={onSubmit}>
        <h2>GDPR</h2>
        <p className='GDPR'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus scelerisque sit amet elit non porttitor. Phasellus in enim rhoncus, luctus sapien eu, sodales nunc. Suspendisse potenti. Curabitur euismod libero lorem, viverra pretium risus rhoncus et. Aenean ultrices nec erat at scelerisque. Etiam accumsan neque ac ipsum scelerisque rutrum. Quisque sed diam faucibus, commodo tellus id, iaculis nunc. Vestibulum ac vehicula lacus, non lobortis nibh. Ut rutrum pellentesque augue nec consectetur. Sed eget odio mauris. Praesent imperdiet ante sit amet lacus finibus, eu scelerisque erat rutrum. Nunc ac libero est.

Pellentesque scelerisque mauris scelerisque lobortis varius. Mauris finibus hendrerit ex eget rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec scelerisque nulla libero, eget tincidunt nunc placerat sed. Aliquam aliquet mi in erat rutrum rhoncus. Mauris facilisis, risus euismod luctus rhoncus, lacus lacus condimentum nisl, sit amet dictum lacus tellus at mi. Morbi auctor vulputate neque, eu iaculis leo eleifend eget. Ut tincidunt id sapien vitae rhoncus. Donec eget tempor turpis. Vivamus congue justo a lorem efficitur dictum sed sit amet eros. Donec molestie luctus rutrum.

Nulla eget tempor augue, eget aliquet dolor. Vestibulum fermentum nisl nulla, et ultrices ipsum placerat sit amet. Maecenas in felis vehicula, fringilla arcu condimentum, maximus leo. Quisque consectetur malesuada nunc et vestibulum. Aliquam aliquam dolor at laoreet molestie. Pellentesque congue non felis ut laoreet. Sed pretium vehicula consectetur. Duis lacinia elit nulla. Sed efficitur auctor nunc sit amet tincidunt. Vestibulum nec facilisis metus. Etiam in venenatis nibh. Sed condimentum ac velit sed pulvinar. Aliquam congue hendrerit velit non tempus. Duis tellus tortor, ullamcorper at tortor non, luctus accumsan ipsum. Quisque in laoreet purus. Donec diam nibh, finibus vitae mollis sit amet, tristique quis elit.

Aenean interdum dolor augue, eget gravida augue pellentesque a. Nulla at augue ante. Suspendisse aliquam orci ac dignissim porttitor. Donec hendrerit magna eget diam viverra tempor quis vitae arcu. Proin fermentum egestas diam, a vestibulum quam condimentum non. Aliquam consectetur feugiat ligula ut vestibulum. Pellentesque cursus enim felis, sit amet condimentum sem tempor eu. Duis et condimentum ante, ut dignissim ex. Phasellus in cursus eros. Nunc vel purus ac odio posuere mollis at sed elit. Vestibulum nisi orci, ullamcorper vel fermentum eget, tempor ac odio. Integer vulputate erat vel congue posuere. Sed placerat nunc sit amet odio scelerisque, sit amet venenatis ante viverra. Praesent eu ornare nulla.

Nam at nisi vel orci convallis sollicitudin nec porttitor augue. Nulla sit amet arcu neque. Vivamus rutrum orci massa, in auctor urna semper ac. Donec laoreet ipsum eget laoreet elementum. Aliquam lobortis dolor nec gravida imperdiet. In feugiat vitae turpis sit amet elementum. Nunc tincidunt nisl a sem bibendum scelerisque. Cras eget facilisis nibh. Nulla suscipit ut nisi sed molestie. Mauris porta, enim ut dictum scelerisque, tortor lacus ullamcorper massa, nec laoreet purus odio eu orci. Quisque non turpis turpis. Maecenas sed mi a urna luctus porta quis ac mi. Vivamus fringilla tortor non massa egestas, quis iaculis nulla malesuada. Pellentesque eget odio volutpat, eleifend est at, cursus neque. Pellentesque iaculis facilisis massa, in rutrum risus tincidunt id. Nullam vehicula tellus eget velit porta consectetur.
        </p>

        <div className='confirmation'>
            <label className='label'>I understand and consent</label>
            <input className='text--input' type='checkbox'/>

        </div>
        
        <input className= 'small--button' type='submit' value='next'/>
      </form>
      </section>
  )
}

export default GDPRetc