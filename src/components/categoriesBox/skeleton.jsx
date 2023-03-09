import './style.css'
import  CategorySkeleton from '../category/skeleton'

function Skeleton(){
  return(
    <section className="categories">
        <h3>Categories</h3>
        <div className="categories__content">
          <CategorySkeleton/>
          <CategorySkeleton/>
          <CategorySkeleton/>
          <CategorySkeleton/>
          <CategorySkeleton/>
          <CategorySkeleton/>
          <CategorySkeleton/>
          <CategorySkeleton/>
          <CategorySkeleton/>
        </div>
      </section>
  )
}

export default Skeleton;