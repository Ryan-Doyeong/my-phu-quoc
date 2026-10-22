"use client"
import {useState} from 'react'

export function PhotoRemoveGrid({urls,inputName='remove_gallery',className='adminBusinessGallery'}:{urls:string[],inputName?:string,className?:string}){
  const [removed,setRemoved]=useState<string[]>([])
  const removedSet=new Set(removed)
  return <>
    <div className={className}>{urls.filter(url=>!removedSet.has(url)).map((url,i)=><div className="removablePhoto" key={url}>
      <img src={url} alt=""/>
      <button type="button" className="removePhotoButton" onClick={()=>setRemoved(v=>[...v,url])}>Remove</button>
      <small>Photo {i+1}</small>
    </div>)}</div>
    {removed.map(url=><input key={url} type="hidden" name={inputName} value={url}/>)}
    {removed.length>0&&<div className="removedPhotoNotice"><span>{removed.length} photo{removed.length>1?'s':''} marked for removal.</span><button type="button" onClick={()=>setRemoved([])}>Undo all</button></div>}
  </>
}
