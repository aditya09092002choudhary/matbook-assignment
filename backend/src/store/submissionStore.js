class SubmissionStore {
  constructor() {
    this.submissions = [];
    this.currentId = 1;
  }

  create(data) {
    const submission = {
      id: `SUB-${String(this.currentId).padStart(6, '0')}`,
      ...data,
      createdAt: new Date().toISOString()
    };
    
    this.submissions.push(submission);
    this.currentId++;
    
    return submission;
  }

  getAll({ page, limit, sortBy, sortOrder, search = '' }) {
    // Filter by search term
    let filtered = this.submissions;
    
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = this.submissions.filter(submission => {
        return Object.values(submission).some(value => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchLower);
          }
          if (Array.isArray(value)) {
            return value.some(v => 
              typeof v === 'string' && v.toLowerCase().includes(searchLower)
            );
          }
          return false;
        });
      });
    }

    // Sort submissions
    const sorted = [...filtered].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    // Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = sorted.slice(startIndex, endIndex);

    return {
      success: true,
      data: paginatedData,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filtered.length / limit),
        totalItems: filtered.length,
        itemsPerPage: limit
      }
    };
  }

  getById(id) {
    return this.submissions.find(sub => sub.id === id);
  }

  update(id, data) {
    const index = this.submissions.findIndex(sub => sub.id === id);
    if (index > -1) {
      // Preserve id and createdAt, update other fields
      this.submissions[index] = {
        ...this.submissions[index],
        ...data,
        id: this.submissions[index].id,
        createdAt: this.submissions[index].createdAt,
        updatedAt: new Date().toISOString()
      };
      return this.submissions[index];
    }
    return null;
  }

  deleteById(id) {
    const index = this.submissions.findIndex(sub => sub.id === id);
    if (index > -1) {
      this.submissions.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const submissionStore = new SubmissionStore();