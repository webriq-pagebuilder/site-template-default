import React from 'react';
import dynamic from 'next/dynamic';
import { urlFor, PortableText } from 'lib/sanity';
import { format } from 'date-fns';
import EditSection from 'components/EditSection';

const Navigation = dynamic(() => import('components/sections/navigation'));
const Footer = dynamic(() => import('components/sections/footer'));

// block styling as props to `components` of the PortableText component
const blockStyle = {
  block: {
    h1: ({ children }) => {
      return (
        <h1 className='mb-6 text-7xl leading-loose text-gray-900'>
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      return (
        <h2 className='mb-6 text-5xl leading-loose text-gray-900'>
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      return (
        <h3 className='mb-6 text-3xl leading-loose text-gray-900'>
          {children}
        </h3>
      );
    },
    h4: ({ children }) => {
      return (
        <h4 className='mb-6 text-xl leading-loose text-gray-900'>{children}</h4>
      );
    },
    normal: ({ children }) => {
      return (
        <p className='mb-6 text-justify leading-loose text-gray-900'>
          {children}
        </p>
      );
    },
    blockquote: ({ children }) => {
      return (
        <blockquote className='mb-6 px-14 italic leading-loose text-gray-500'>
          - {children}
        </blockquote>
      );
    },
  },
  code: ({ value }) => {
    <pre data-language={value.language}>
      <code>{value.code}</code>
    </pre>;
  },
  list: {
    bullet: ({ children }) => {
      return (
        <ul className='mb-6 list-disc pl-10 leading-loose text-gray-900'>
          {children}
        </ul>
      );
    },
    number: ({ children }) => {
      return (
        <ol className='mb-6 list-decimal leading-loose text-gray-900'>
          {children}
        </ol>
      );
    },
  },
  listItem: {
    bullet: ({ children }) => (
      <li className='mb-6 leading-loose text-gray-900'>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ children, value }) => (
      <a
        className='hover:text-webriq-darkorange text-webriq-lightorange'
        href={value.href}
        target='_blank'
        rel='noopener noreferrer'
      >
        {children}
      </a>
    ),
  },
  types: {
    addImage: ({ value }) => (
      <img
        className='mb-5 h-full w-full'
        src={urlFor(value?.image)}
        alt={value?.alt ?? value?.image?.asset?._ref}
      />
    ),
  },
};

function BlogSections({ data, preview = false }) {
  const blogData = data || data?.[0];

  if (!blogData) {
    return null;
  }

  const {
    _id,
    _type,
    authors,
    categories,
    body,
    mainImage,
    publishedAt,
    title,
  } = blogData;

  return (
    <>
      {preview && <EditSection documentType={_type} documentId={_id} />}
      {blogData?.navigation?.map(nav => (
        <Navigation
          key={nav?._key}
          data={nav}
          template={{
            bg: 'gray',
            color: 'webriq',
          }}
          preview={preview}
        />
      ))}
      <section className='pb-20'>
        <div
          className='mb-12 p-20'
          style={{
            backgroundImage: `url(${mainImage && urlFor(mainImage)})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div className='container mx-auto px-4'>
            <div className='mx-auto max-w-2xl text-center'>
              {categories &&
                categories?.map((tag, index) => (
                  <span
                    className='text-base uppercase text-webriq-blue mix-blend-difference lg:text-xl'
                    key={index}
                  >
                    {tag?.title}
                  </span>
                ))}
              {categories && publishedAt && (
                <span className='mx-2 text-base uppercase text-gray-500 lg:text-xl'>
                  •
                </span>
              )}
              {publishedAt && (
                <span
                  className={`text-base text-white mix-blend-difference lg:text-xl ${
                    categories ?? 'ml-2'
                  }`}
                >
                  {format(new Date(publishedAt), 'MMMM dd, yyyy')}
                </span>
              )}
              <div className='mt-2'>
                {title && (
                  <h2 className='mb-6 text-4xl font-bold text-white mix-blend-difference lg:text-5xl'>
                    {title}
                  </h2>
                )}
                <div className='flex justify-center'>
                  {authors &&
                    authors?.map((author, index, { length }) => (
                      <div className='flex justify-center' key={index}>
                        <div className='mr-4'>
                          {author?.profile?.image ? (
                            <img
                              className='h-12 w-12 rounded-full object-cover object-top'
                              src={urlFor(author?.profile?.image)}
                              alt={author?.profile?.alt ?? author?.name}
                            />
                          ) : (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='48'
                              height='48'
                              viewBox='0 0 24 24'
                            >
                              <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z' />
                            </svg>
                          )}
                        </div>
                        <div className='text-left'>
                          <h3 className='font-bold text-webriq-blue mix-blend-difference'>
                            {author?.name}
                          </h3>
                          {index + 1 !== length ? (
                            <span>&nbsp;and&nbsp;</span>
                          ) : null}
                          <span className='text-xs italic text-webriq-lightblue mix-blend-difference'>
                            {authors?.length > 1 ? 'Authors' : 'Author'}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container mx-auto px-4'>
          {body && (
            <div className='mx-auto max-w-4xl break-all'>
              <PortableText value={body} components={blockStyle} />
            </div>
          )}
        </div>
      </section>
      {blogData?.footer?.map(footer => (
        <Footer
          key={footer?._key}
          data={footer}
          template={{
            bg: 'gray',
            color: 'webriq',
          }}
          preview={preview}
        />
      ))}
    </>
  );
}

export default React.memo(BlogSections);
