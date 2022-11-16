import { memo } from "react";
import NotFoundPage from "component/NotFoundPage";
function PageNotFound({ data }) {
  return <NotFoundPage {...{ data }} />;
}
export default memo(PageNotFound);
