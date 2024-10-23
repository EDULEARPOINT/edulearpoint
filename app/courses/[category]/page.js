import { courseData } from '@/app/data/CourseData';
import CourseDetails from '../_components/CourseDetails';

export default function CategoryPage({ params }) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);
  const formattedCategory = decodedCategory.replace(/-/g, ' ').toLowerCase();
  const courses = courseData[formattedCategory] || [];

  if (!courses.length) {
    return (
      <div>
        <h1>Category not found: {formattedCategory}</h1>
        <p>Available categories: {Object.keys(courseData).join(', ')}</p>
      </div>
    );
  }

  return <CourseDetails category={formattedCategory} courses={courses} />;
}