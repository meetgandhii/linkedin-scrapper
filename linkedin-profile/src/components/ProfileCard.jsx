function ProfileCard({ profile }) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-blue-600 h-32"></div>
        <div className="px-6 pb-6">
          <div className="flex items-start gap-6 -mt-16">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 rounded-lg border-4 border-white shadow-lg object-cover"
            />
            <div className="pt-16">
              <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-lg text-gray-600">{profile.position}</p>
              <p className="text-gray-500">{profile.city}</p>
              <div className="mt-2 flex gap-4">
                <span className="text-blue-600">{profile.followers} followers</span>
                <span className="text-blue-600">{profile.connections}+ connections</span>
              </div>
            </div>
          </div>
  
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">About</h3>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: profile.about }}
              />
            </div>
  
            <div>
              <h3 className="text-xl font-semibold mb-4">Experience</h3>
              <div className="space-y-4">
                {profile.experience?.map((exp, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={exp.company_logo_url}
                      alt={exp.company}
                      className="w-12 h-12 rounded"
                    />
                    <div>
                      <h4 className="font-semibold">{exp.title}</h4>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-gray-500">{exp.duration}</p>
                      <div 
                        className="mt-2 prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: exp.description_html }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            <div>
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <div className="space-y-4">
                {profile.education?.map((edu, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={edu.institute_logo_url}
                      alt={edu.title}
                      className="w-12 h-12 rounded"
                    />
                    <div>
                      <h4 className="font-semibold">{edu.title}</h4>
                      <p className="text-gray-600">{edu.degree}</p>
                      <p className="text-gray-600">{edu.field}</p>
                      <p className="text-gray-500">{edu.start_year} - {edu.end_year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {profile.projects && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Projects</h3>
                <div className="space-y-4">
                  {profile.projects.map((project, index) => (
                    <div key={index}>
                      <h4 className="font-semibold">{project.title}</h4>
                      <p className="text-gray-500">
                        {project.start_date} {project.end_date ? `- ${project.end_date}` : ''}
                      </p>
                      <div 
                        className="mt-2 prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: project.description }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default ProfileCard;