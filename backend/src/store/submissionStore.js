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

  getAll({ page, limit, sortBy, sortOrder }) {
    // Sort submissions
    const sorted = [...this.submissions].sort((a, b) => {
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
        totalPages: Math.ceil(this.submissions.length / limit),
        totalItems: this.submissions.length,
        itemsPerPage: limit
      }
    };
  }

  getById(id) {
    return this.submissions.find(sub => sub.id === id);
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